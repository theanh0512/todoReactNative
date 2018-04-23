/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';

import {actionCreators} from './app/todoListRedux';
import List from './app/List';
import Input from './app/Input';
import Title from './app/Title';

export default class App extends Component {

    state = {};

    componentWillMount() {
        const {store} = this.props;

        const {todos} = store.getState();
        this.setState({todos});

        this.unsubscribe = store.subscribe(() => {
            const {todos} = store.getState();
            this.setState({todos});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onAddTodo = (text) => {
        const {store} = this.props;

        store.dispatch(actionCreators.add(text));
    };

    onRemoveTodo = (index) => {
        const {store} = this.props;

        store.dispatch(actionCreators.remove(index));
    };

    render() {
        const {todos} = this.state;

        return (
            <View>
                <Title>
                    To-Do List
                </Title>
                <Input
                    placeholder={'Type a todo, then hit enter!'}
                    onSubmitEditing={this.onAddTodo}
                />
                <List
                    list={todos}
                    onPressItem={this.onRemoveTodo}
                />
            </View>
        );
    }
}
