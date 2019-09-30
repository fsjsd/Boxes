import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";

function UndoRedo() {
  const dispatch = useDispatch();

  const { canUndo, canRedo } = useSelector(state => ({
    canUndo: state.boxes.past.length > 0,
    canRedo: state.boxes.future.length > 0
  }));

  return (
    <div>
      <button
        data-testid="undo"
        disabled={!canUndo}
        onClick={() => dispatch(UndoActionCreators.undo())}
      >
        Undo
      </button>
      <button
        data-testid="redo"
        disabled={!canRedo}
        onClick={() => dispatch(UndoActionCreators.redo())}
      >
        Redo
      </button>
    </div>
  );
}

export default UndoRedo;
