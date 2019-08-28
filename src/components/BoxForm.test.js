import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BoxForm from "./BoxForm";
import { initialStateFactory } from "../__testutils__/initialStateFactory";
import renderWithRedux from "../__testutils__/renderWithRedux";
import rootReducer from "../state/reducers/index";

afterEach(cleanup);

describe("BoxForm component", () => {
  it("renders without crashing", () => {
    renderWithRedux(<BoxForm />, {
      initialState: initialStateFactory(),
      reducer: rootReducer
    });
  });

  it("Adds boxspec to store", () => {
    const { getByTestId, store } = renderWithRedux(<BoxForm />, {
      initialState: initialStateFactory({ present: [] }),
      reducer: rootReducer
    });

    expect(store.getState().boxes.present.length).toBe(0);

    const addButton = getByTestId("add-box");
    fireEvent.click(addButton);

    expect(store.getState().boxes.present.length).toBe(1);
  });
});
