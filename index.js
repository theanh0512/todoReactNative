import {AppRegistry} from 'react-native';
import {createStore} from 'redux';
// Import the reducer and create a store
import {reducer} from './app/todoListRedux';
// Import the App container component
import App from './App';
import React from "react";

const store = createStore(reducer);


// Pass the store into the app container
const AppWithStore = () => <App store={store}/>;

AppRegistry.registerComponent('todo', () => AppWithStore);
