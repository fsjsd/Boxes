import * as actions from "./boxActions";

describe("box actions", () => {
  it("should create an action to add a box", () => {
    const boxSpec = { id: "someid" };
    const expectedAction = {
      type: actions.addBox.type,
      payload: boxSpec
    };
    expect(actions.addBox(boxSpec)).toEqual(expectedAction);
  });
  it("should create an action to remove a box", () => {
    const boxSpec = { id: "someid" };
    const expectedAction = {
      type: actions.removeBox.type,
      payload: boxSpec
    };
    expect(actions.removeBox(boxSpec)).toEqual(expectedAction);
  });
  it("should create an action to move a box", () => {
    const boxSpec = { id: "newboxid" };
    const expectedAction = {
      type: actions.moveBox.type,
      payload: boxSpec
    };
    expect(actions.moveBox(boxSpec)).toEqual(expectedAction);
  });
  it("should create an action to resize a box", () => {
    const boxSpec = { id: "newboxid" };
    const expectedAction = {
      type: actions.resizeBox.type,
      payload: boxSpec
    };
    expect(actions.resizeBox(boxSpec)).toEqual(expectedAction);
  });
});
