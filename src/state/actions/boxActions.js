import { createAction } from "redux-starter-kit";

export const addBox = createAction("ADD_BOX");
export const removeBox = createAction("REMOVE_BOX");
export const moveBox = createAction("MOVE_BOX");
export const resizeBox = createAction("RESIZE_BOX");
