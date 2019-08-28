import { boxesReducer } from "./boxes";
import * as actions from "../actions/boxActions";

describe("boxes reducer", () => {
  it("should return the initial state", () => {
    expect(boxesReducer(undefined, {})).toEqual([]);
  });

  // ADD_BOX

  it("should handle ADD_BOX and set zOrder", () => {
    // new box added with zOrder
    expect(
      boxesReducer([], {
        type: actions.addBox.type,
        payload: { id: "newboxid" }
      })
    ).toEqual([{ id: "newboxid" }]);
  });

  it("should handle ADD_BOX", () => {
    // new box added to existing state
    expect(
      boxesReducer([{ id: "newboxid" }], {
        type: actions.addBox.type,
        payload: { id: "newboxid2" }
      })
    ).toEqual([
      {
        id: "newboxid"
      },
      {
        id: "newboxid2"
      }
    ]);
  });

  // REMOVE_BOX

  it("should handle REMOVE_BOX", () => {
    expect(
      boxesReducer([{ id: "1" }, { id: "2" }, { id: "3" }], {
        type: actions.removeBox.type,
        payload: "2"
      })
    ).toEqual([{ id: "1" }, { id: "3" }]);
  });

  // MOVE_BOX

  it("should handle MOVE_BOX and apply new coordinates", () => {
    expect(
      boxesReducer([{ id: "1" }, { id: "2" }, { id: "3" }], {
        type: actions.moveBox.type,
        payload: {
          id: "2",
          coords: {
            x: 1,
            y: 1
          }
        }
      })
    ).toEqual([{ id: "1" }, { id: "3" }, { id: "2", left: 1, top: 1 }]);
  });

  function moveMissingBox() {
    boxesReducer([], {
      type: actions.moveBox.type,
      payload: {
        id: "movingboxid"
      }
    });
  }

  it("should handle MOVE_BOX and throw an error if the given box is missing", () => {
    expect(moveMissingBox).toThrowError("Invalid box id in MOVE_BOX action");
  });

  // RESIZE_BOX

  it("should handle RESIZE_BOX and increase scale", () => {
    expect(
      boxesReducer(
        [
          {
            id: "newboxid",
            scale: 0.1
          }
        ],
        {
          type: actions.resizeBox.type,
          payload: {
            id: "newboxid",
            scaleStep: 0.1
          }
        }
      )
    ).toEqual([
      {
        id: "newboxid",
        scale: 0.2
      }
    ]);
  });

  // RESIZE_BOX

  it("should handle RESIZE_BOX and set scale negatively", () => {
    expect(
      boxesReducer(
        [
          {
            id: "newboxid",
            scale: 0.2
          }
        ],
        {
          type: actions.resizeBox.type,
          payload: {
            id: "newboxid",
            scaleStep: -0.1
          }
        }
      )
    ).toEqual([
      {
        id: "newboxid",
        scale: 0.1
      }
    ]);
  });

  function resizeMissingBox() {
    boxesReducer([], {
      type: actions.resizeBox.type,
      payload: {
        id: "newboxid",
        scaleStep: -0.1
      }
    });
  }

  it("should handle RESIZE_BOX and throw an error if the given box is missing", () => {
    expect(resizeMissingBox).toThrowError(
      "Invalid box id in RESIZE_BOX action"
    );
  });

  // /END
});
