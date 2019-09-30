import React from "react";
import Box from "./Box";
import { render as renderDom } from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { boxSpecFactory } from "../__testutils__/boxSpecFactory";

afterEach(cleanup);

describe("Box component", () => {
  it("throws error if required props not set", () => {
    const renderBox = () => {
      renderDom(<Box boxSpec={boxSpecFactory()} />);
    };

    expect(renderBox).toThrowError();
  });

  it("raises onClick event when clicked", () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Box
        boxSpec={boxSpecFactory()}
        onClick={handleClick}
        onDragged={() => {}}
        onMouseWheel={() => {}}
      />
    );
    const box = container.firstChild;
    fireEvent.click(box);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("raises onDragged event when dragged", () => {
    const handleDragged = jest.fn();
    const { container } = render(
      <Box
        boxSpec={boxSpecFactory({ left: 10, top: 20 })}
        onDragged={handleDragged}
        onClick={() => {}}
        onMouseWheel={() => {}}
      />
    );
    const box = container.firstChild;
    fireEvent.dragStart(box);
    expect(handleDragged).toHaveBeenCalledTimes(0);
    fireEvent.dragEnd(box);
    expect(handleDragged).toHaveBeenCalledTimes(1);
  });

  it("raises onMouseWheel event when mouse wheel scrolled", () => {
    const handleMouseWheel = jest.fn();
    const { container } = render(
      <Box
        boxSpec={boxSpecFactory()}
        onClick={() => {}}
        onDragged={() => {}}
        onMouseWheel={handleMouseWheel}
      />
    );
    const box = container.firstChild;
    fireEvent.wheel(box);
    expect(handleMouseWheel).toHaveBeenCalledTimes(1);
  });
});
