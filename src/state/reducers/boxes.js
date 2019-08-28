import { createReducer } from "redux-starter-kit";
import undoable from "redux-undo";
import { addBox, removeBox, moveBox, resizeBox } from "../actions/boxActions";

const boxesReducer = createReducer([], {
  [addBox]: (state, action) => {
    state.push({
      ...action.payload,
      zOrder: state.length + 1 // zOrder set based on array length to place on top!
    });
    return state;
  },
  [removeBox]: (state, action) => {
    return state.filter(box => box.id !== action.payload);
  },
  [moveBox]: (state, action) => {
    const { id, coords } = action.payload;
    const movingBox = state.find(box => box.id === id);

    if (!movingBox) {
      throw Error("Invalid box id in MOVE_BOX action");
    }

    // re order array so moving box is last, thus appearing 'on top' in the UI
    // post drag (array index used as z-index)
    return [
      ...state.filter(box => box.id !== id),
      { ...movingBox, left: coords.x, top: coords.y }
    ];
  },
  [resizeBox]: (state, action) => {
    const { id, scaleStep } = action.payload;
    const resizingBox = state.find(box => box.id === id);

    if (!resizingBox) {
      throw Error("Invalid box id in RESIZE_BOX action");
    }

    resizingBox.scale += scaleStep;

    return state;
  }
});

// export 'bare' reducer outsite undoable for unit tests ...
export { boxesReducer };

export default undoable(boxesReducer);
