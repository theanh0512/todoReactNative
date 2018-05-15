/**
 * This file handles creating the redux store and passing it to our Provider.
 * The Provider will let us connect our App container to the store with connect().
 * */
import { AppRegistry } from "react-native";
import { createStore } from "redux";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import reducer from "./app/reducers";
import middleware from "./app/middleware";

const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, reducer);

let store = createStore(persistedReducer, middleware);
let persistor = persistStore(store);

// Pass the store into the Provider
const AppWithStore = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent("todo", () => AppWithStore);
