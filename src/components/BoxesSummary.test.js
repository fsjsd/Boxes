import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BoxesSummary from "./BoxesSummary";
import { boxSpecFactory } from "../__testutils__/boxSpecFactory";
import { initialStateFactory } from "../__testutils__/initialStateFactory";
import renderWithRedux from "../__testutils__/renderWithRedux";
import rootReducer from "../state/reducers/index";

afterEach(cleanup);

describe("BoxesSummary component", () => {
  it("renders without crashing", () => {
    renderWithRedux(<BoxesSummary />, {
      initialState: initialStateFactory(),
      reducer: rootReducer
    });
  });

  it("renders no boxes", () => {
    const { container } = renderWithRedux(<BoxesSummary />, {
      initialState: initialStateFactory(),
      reducer: rootReducer
    });

    expect(container.firstChild).toHaveTextContent("There are no boxes");
  });

  it("renders 1 yellow box", () => {
    const { container } = renderWithRedux(<BoxesSummary />, {
      initialState: initialStateFactory({
        present: [boxSpecFactory({ boxColor: "yellow" })]
      }),
      reducer: rootReducer
    });

    expect(container.firstChild).toHaveTextContent("There is 1 yellow box");
  });

  it("renders 2 yellow boxes", () => {
    const { container } = renderWithRedux(<BoxesSummary />, {
      initialState: initialStateFactory({
        present: [
          boxSpecFactory({ boxColor: "yellow" }),
          boxSpecFactory({ boxColor: "yellow" })
        ]
      }),
      reducer: rootReducer
    });

    expect(container.firstChild).toHaveTextContent("There are 2 yellow boxes");
  });

  it("renders 2 yellow boxes and 1 red box", () => {
    const { container } = renderWithRedux(<BoxesSummary />, {
      initialState: initialStateFactory({
        present: [
          boxSpecFactory({ boxColor: "yellow" }),
          boxSpecFactory({ boxColor: "yellow" }),
          boxSpecFactory({ boxColor: "red" })
        ]
      }),
      reducer: rootReducer
    });

    expect(container.firstChild).toHaveTextContent(
      "There are 2 yellow boxes and 1 red box"
    );
  });

  it("renders 2 yellow boxes, 1 red box and 1 red box", () => {
    const { container } = renderWithRedux(<BoxesSummary />, {
      initialState: initialStateFactory({
        present: [
          boxSpecFactory({ boxColor: "yellow" }),
          boxSpecFactory({ boxColor: "yellow" }),
          boxSpecFactory({ boxColor: "red" }),
          boxSpecFactory({ boxColor: "purple" })
        ]
      }),
      reducer: rootReducer
    });

    expect(container.firstChild).toHaveTextContent(
      "There are 2 yellow boxes, 1 red box and 1 purple box"
    );
  });
});
