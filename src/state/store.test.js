import "../__testutils__/IDBIndex.mock";
import { store } from "./store";

describe("redux store", () => {
  it("should return the initial state", () => {
    expect(store).not.toBeNull();
    const state = store.getState();
    expect(state.boxes.present).toEqual([]);
  });
});
