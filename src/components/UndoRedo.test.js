import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UndoRedo from "./UndoRedo";
import { addBox } from "../state/actions/boxActions";
import { initialStateFactory } from "../__testutils__/initialStateFactory";
import { boxSpecFactory } from "../__testutils__/boxSpecFactory";
import renderWithRedux from "../__testutils__/renderWithRedux";
import rootReducer from "../state/reducers/index";

afterEach(cleanup);

describe("UndoRedo component", () => {
  it("renders without crashing", () => {
    renderWithRedux(<UndoRedo />, {
      initialState: initialStateFactory(),
      reducer: rootReducer
    });
  });

  it("cannot undo or redo", () => {
    const { getByTestId, store } = renderWithRedux(<UndoRedo />, {
      initialState: initialStateFactory({ present: [] }),
      reducer: rootReducer
    });

    expect(store.getState().boxes.present.length).toBe(0);

    const undoButton = getByTestId("undo");
    const redoButton = getByTestId("redo");

    expect(undoButton).toHaveAttribute("disabled");
    expect(redoButton).toHaveAttribute("disabled");
  });

  it("undo enabled after adding box", () => {
    const { getByTestId, store } = renderWithRedux(<UndoRedo />, {
      initialState: initialStateFactory({ present: [] }),
      reducer: rootReducer
    });

    expect(store.getState().boxes.present.length).toBe(0);

    store.dispatch(addBox({}));

    expect(store.getState().boxes.present.length).toBe(1);

    const undoButton = getByTestId("undo");
    const redoButton = getByTestId("redo");

    expect(undoButton).not.toHaveAttribute("disabled");
    expect(redoButton).toHaveAttribute("disabled");
  });

  it("redo enabled if items in future", () => {
    const { getByTestId, store } = renderWithRedux(<UndoRedo />, {
      initialState: initialStateFactory({
        past: [
          boxSpecFactory({
            boxColor: "yellow"
          })
        ]
      }),
      reducer: rootReducer
    });

    expect(store.getState().boxes.past.length).toBe(1);

    const undoButton = getByTestId("undo");
    const redoButton = getByTestId("redo");

    expect(undoButton).not.toHaveAttribute("disabled");
    expect(redoButton).toHaveAttribute("disabled");

    // To test redo, could dispatch the action but keeping with the
    // react-testing-library philosophy we'll 'click' the redo button
    // to keep the test close to what a user would do.

    fireEvent.click(undoButton);

    expect(undoButton).toHaveAttribute("disabled");
    expect(redoButton).not.toHaveAttribute("disabled");
  });
});
