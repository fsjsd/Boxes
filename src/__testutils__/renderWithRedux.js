import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { render } from "@testing-library/react";

// Redux render util adapted from Kent Dodd's example here:
// https://testing-library.com/docs/example-react-redux

export default function renderWithRedux(
  ui,
  { initialState, reducer, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}
