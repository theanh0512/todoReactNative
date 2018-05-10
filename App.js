/**
 * App is connected to the store using connect(). It pulls the list data, todos,
 * out of the store's state using mapStateToProps.
 * It uses the dispatch() function added to its props to dispatch actions to modify the store.
 */

import React, { Component } from "react";
import { View } from "react-native";

import todoListRedux from "./app/todoListRedux";
import List from "./app/List";
import Input from "./app/Input";
import Title from "./app/Title";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  todos: state.todos,
  goals: state.goals
});

class App extends Component {
  onAddTodo = text => {
    const { dispatch } = this.props;

    dispatch(todoListRedux.actionCreators.addTodo(text));
  };

  onRemoveTodo = index => {
    const { dispatch } = this.props;

    dispatch(todoListRedux.actionCreators.removeTodo(index));
  };

  onAddGoal = text => {
    const { dispatch } = this.props;

    dispatch(todoListRedux.actionCreators.addGoal(text));
  };

  onRemoveGoal = index => {
    const { dispatch } = this.props;

    dispatch(todoListRedux.actionCreators.removeGoal(index));
  };

  render() {
    const { todos, goals } = this.props;

    return (
      <View>
        <Title>To-Do List</Title>
        <Input
          placeholder={"Type a todo, then hit enter!"}
          onSubmitEditing={this.onAddTodo}
        />
        <List list={todos} onPressItem={this.onRemoveTodo} />

        <Title>Goal List</Title>
        <Input
          placeholder={"Type a goal, then hit enter!"}
          onSubmitEditing={this.onAddGoal}
        />
        <List list={goals} onPressItem={this.onRemoveGoal} />
      </View>
    );
  }
}

export default connect(mapStateToProps)(App);
