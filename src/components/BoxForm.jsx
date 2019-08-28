import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uuidv4 from "uuid/v4";
import styled from "styled-components";
import { addBox } from "../state/actions/boxActions";

const Heading = styled.h3`
  margin-top: 0px;
`;

const BoxFormStyled = styled.div`
  > * {
    margin-bottom: 10px;
  }
`;

export default function BoxForm() {
  const [scale, setScale] = useState(1);
  const [boxColor, setBoxColor] = useState("red");
  const dispatch = useDispatch();

  return (
    <BoxFormStyled>
      <Heading>Add box</Heading>
      <div>
        <label>Size</label>
      </div>
      <div>
        <select
          value={scale}
          onChange={ev => setScale(parseFloat(ev.target.value))}
        >
          <option value={0.7}>small</option>
          <option value={1}>medium</option>
          <option value={1.3}>large</option>
        </select>
      </div>
      <div>
        <label>Color</label>
      </div>
      <div>
        <select value={boxColor} onChange={ev => setBoxColor(ev.target.value)}>
          <option>red</option>
          <option>blue</option>
          <option>green</option>
          <option>purple</option>
          <option>yellow</option>
          <option>magenta</option>
        </select>
      </div>
      <div>
        <button
          data-testid="add-box"
          onClick={() =>
            dispatch(
              addBox({ scale, boxColor, left: 260, top: 30, id: uuidv4() })
            )
          }
        >
          Add
        </button>
      </div>
    </BoxFormStyled>
  );
}

BoxForm.propTypes = {};
