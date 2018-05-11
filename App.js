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
import { deleteGoal, deleteTodo, fetchGoals, fetchTodos } from "./app/API";

const mapStateToProps = state => ({
  todos: state.todos,
  goals: state.goals,
  loading: state.loading
});

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    Promise.all([fetchTodos(), fetchGoals()]).then(([todos, goals]) => {
      dispatch(todoListRedux.actionCreators.receiveData(todos, goals));
    });
  }

  onAddTodo = text => {
    const { dispatch } = this.props;

    dispatch(todoListRedux.actionCreators.addTodo({ item: text }));
  };

  onRemoveTodo = (index, { id, name }) => {
    const { dispatch } = this.props;
    dispatch(todoListRedux.actionCreators.removeTodo(index));

    return deleteTodo(id).catch(() => {
      dispatch(todoListRedux.actionCreators.addTodo({ item: name, id: id }));
      alert("An error occurred. Try again.");
    });
  };

  onAddGoal = text => {
    const { dispatch } = this.props;

    dispatch(todoListRedux.actionCreators.addGoal({ item: text }));
  };

  onRemoveGoal = (index, { id, name }) => {
    const { dispatch } = this.props;
    dispatch(todoListRedux.actionCreators.removeGoal(index));

    return deleteGoal(id).catch(() => {
      dispatch(todoListRedux.actionCreators.addGoal({ item: name, id: id }));
      alert("An error occurred. Try again.");
    });
  };

  render() {
    const { todos, goals, loading } = this.props;

    if (loading === true) {
      return (
        <View>
          <Title>LOADING</Title>
        </View>
      );
    }

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
