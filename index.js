/**
 * This file handles creating the redux store and passing it to our Provider.
 * The Provider will let us connect our App container to the store with connect().
 * */
import {AppRegistry} from 'react-native';
import {createStore} from 'redux';
// Import the reducer and create a store
import {reducer} from './app/todoListRedux';
// Import the App container component
import App from './App';
import React from "react";
import {Provider} from 'react-redux';

const store = createStore(reducer);


// Pass the store into the Provider
const AppWithStore = () => (
    <Provider store={store}>
        <App/>
    </Provider>
);

AppRegistry.registerComponent('todo', () => AppWithStore);
