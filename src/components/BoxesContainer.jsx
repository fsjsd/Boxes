import React from "react";
import Box from "../components/Box";
import BoxFormContainer from "../components/BoxFormContainer";
import BoxForm from "../components/BoxForm";
import BoxesSummary from "../components/BoxesSummary";
import UndoRedo from "./UndoRedo";
import { useSelector, useDispatch } from "react-redux";
import { removeBox, moveBox, resizeBox } from "../state/actions/boxActions";

export default function BoxesContainer() {
  const boxes = useSelector(state => state.boxes.present);
  const dispatch = useDispatch();

  // Note: <BoxForm>'s zIndex is derived from array length of boxes
  // to keep it on top

  return (
    <div>
      <BoxFormContainer zIndex={boxes.length + 1}>
        <BoxForm />
        <hr />
        <UndoRedo />
      </BoxFormContainer>
      {boxes.map((boxSpec, i) => (
        <Box
          key={i}
          onClick={id => {
            dispatch(removeBox(id));
          }}
          onDragged={(id, coords) => {
            dispatch(moveBox({ id, coords }));
          }}
          onMouseWheel={(id, scaleStep) =>
            dispatch(resizeBox({ id, scaleStep }))
          }
          boxSpec={{ ...boxSpec, zOrder: i }}
        />
      ))}
      <BoxesSummary />
    </div>
  );
}
