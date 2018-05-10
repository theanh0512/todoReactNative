/**
 * This file handles creating the redux store and passing it to our Provider.
 * The Provider will let us connect our App container to the store with connect().
 * */
import { AppRegistry } from "react-native";
import { applyMiddleware, createStore } from "redux";
// Import the todoReducer and create a store
import todoListRedux, { checker, logger } from "./app/todoListRedux";
// Import the App container component
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(
  persistConfig,
  todoListRedux.rootReducer
);

let store = createStore(persistedReducer, applyMiddleware(checker, logger));
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
