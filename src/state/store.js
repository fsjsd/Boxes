import { configureStore } from "redux-starter-kit";
import { persistStore, persistReducer } from "redux-persist";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";
import logger from "redux-logger";
import rootReducer from "./reducers";

function configureAppStore(preloadedState) {
  const persistConfig = {
    key: "root",
    storage: createIdbStorage({
      name: "spitfireboxes",
      storeName: "reduxpersist"
    }),
    serialize: true
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const middleware = []; //logger

  if (
    process &&
    process.env &&
    process.env.NODE_ENV !== "test" &&
    process.env.NODE_ENV !== "production"
  ) {
    middleware.push(logger);
  }

  const store = configureStore({
    reducer: persistedReducer,
    middleware,
    preloadedState,
    enhancers: []
  });

  return store;
}

const initialState = {
  boxes: {
    past: [],
    present: [],
    future: []
  }
};

export const store = configureAppStore(initialState);
export const persistor = persistStore(store);
