// Mocks for IndexDB to get redux-persist storage working in tests

window.indexedDB = jest.fn().mockImplementation(() => {
  return {
    dispatchEvent: jest.fn()
  };
});

window.IDBIndex = jest.fn().mockImplementation(() => {
  return {
    dispatchEvent: jest.fn()
  };
});

window.IDBCursor = jest.fn().mockImplementation(() => {
  return {
    //
  };
});

window.IDBObjectStore = jest.fn().mockImplementation(() => {
  return {
    //
  };
});

window.IDBTransaction = jest.fn().mockImplementation(() => {
  return {
    //
  };
});

window.IDBDatabase = jest.fn().mockImplementation(() => {
  return {
    //
  };
});
