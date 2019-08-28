import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const BoxFormContainerStyled = styled.div`
  display: inline-block;
  width: 200px;
  background-color: white;
  border: solid 1px #bbb;
  position: absolute;
  left: 10px;
  right: 10px;
  padding: 20px;
  ${props =>
    css`
      z-index: ${props.zIndex};
    `}
`;

export default function BoxFormContainer({ zIndex = 0, children }) {
  return (
    <BoxFormContainerStyled zIndex={zIndex}>{children}</BoxFormContainerStyled>
  );
}

BoxFormContainer.propTypes = {
  zIndex: PropTypes.number.isRequired
};
