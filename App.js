/**
 * App is connected to the store using connect(). It pulls the list data, todos,
 * out of the store's state using mapStateToProps.
 * It uses the dispatch() function added to its props to dispatch actions to modify the store.
 */

import React, {Component} from 'react';
import {View} from 'react-native';

import {actionCreators} from './app/todoListRedux';
import List from './app/List';
import Input from './app/Input';
import Title from './app/Title';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    todos: state.todos,
});

class App extends Component {

    onAddTodo = (text) => {
        const {dispatch} = this.props;

        dispatch(actionCreators.add(text));
    };

    onRemoveTodo = (index) => {
        const {dispatch} = this.props;

        dispatch(actionCreators.remove(index));
    };

    render() {
        const {todos} = this.props;

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

export default connect(mapStateToProps)(App);
