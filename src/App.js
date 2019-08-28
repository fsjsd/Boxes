import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./state/store";
import BoxesContainer from "./components/BoxesContainer";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<>loading...</>} persistor={persistor}>
        <BoxesContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
