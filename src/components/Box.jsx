import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const boxDefaults = {
  width: 100,
  height: 100,
  left: 0,
  top: 0,
  scale: 1,
  boxColor: "#777" // boring neutral mid grey
};

const SCALE_STEP_SIZE = 0.05;

/*

NOTES: Started implementing this with a CSS transform for 
resizing, but Chrome ignores the scaling when it snapshots the
dragging element (weirdly it works in Edge).

This can be fixed by implementing a component to set the drag
image declaratively, but this is over-baking it as the width/height
scaling meets the requirements.

// transform: scale(${props.scale});

*/

const BoxStyled = styled.div`
  display: block;
  cursor: pointer;
  position: absolute;
  user-select: none;
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.3);

  ${props =>
    css`
        left:${props.left}px
        top:${props.top}px
        background-color: ${props.boxColor};
        z-index: ${props.zOrder};       
        width:${boxDefaults.width * props.scale}px
        height:${boxDefaults.height * props.scale}px
      `}

  ${props =>
    props.isDragging &&
    css`
      opacity: 0.5;
    `}
`;

const Box = function({
  boxSpec: {
    id = "",
    left = boxDefaults.left,
    top = boxDefaults.top,
    scale = boxDefaults.scale,
    zOrder = 1,
    boxColor = boxDefaults.boxColor
  },
  onClick = () => {
    throw Error("Must implement onClick");
  },
  onDragged = () => {
    throw Error("Must implement onDragged");
  },
  onMouseWheel = () => {
    throw Error("Must implement onMouseWheel");
  }
} = {}) {
  const [dragCursorOffset, setDragCursorOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = ev => {
    // capture mouse position relative to element
    setDragCursorOffset({
      x: ev.clientX - left,
      y: ev.clientY - top
    });

    setIsDragging(true);
  };

  const handleDragEnd = ev => {
    // calculate end position minus mouse offset
    const endingPosition = {
      x: ev.clientX - dragCursorOffset.x,
      y: ev.clientY - dragCursorOffset.y
    };

    setIsDragging(false);

    // trigger onDragged prop for parent component
    // to update state.
    onDragged(id, endingPosition);
  };

  const handleWheel = ev => {
    //ev.persist();
    const step = ev.deltaY > 0 ? -SCALE_STEP_SIZE : SCALE_STEP_SIZE;
    onMouseWheel(id, step);
  };

  // ondragstart/ondragend -> IE9+ https://www.w3schools.com/tags/ev_ondragstart.asp

  return (
    <BoxStyled
      draggable
      isDragging={isDragging}
      left={left}
      top={top}
      scale={scale}
      zOrder={zOrder}
      boxColor={boxColor}
      alt={zOrder}
      onClick={() => onClick(id)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onWheel={handleWheel}
    />
  );
};

export default Box;

Box.propTypes = {
  boxSpec: PropTypes.shape({
    id: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
    zOrder: PropTypes.number.isRequired,
    boxColor: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func.isRequired,
  onDragged: PropTypes.func.isRequired
};
