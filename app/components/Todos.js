import { connect } from "react-redux";
import { addTodo, handleDeleteTodo } from "../actions/todos";
import React, { Component } from "react";
import { View } from "react-native";
import Title from "./Title";
import List from "./List";
import Input from "./Input";

const mapStateToProps = state => ({
  todos: state.todos
});

class Todos extends Component {
  onAddTodo = text => {
    const { dispatch } = this.props;

    dispatch(addTodo({ item: text }));
  };

  onRemoveTodo = (index, { id, name }) => {
    const { dispatch } = this.props;
    dispatch(handleDeleteTodo(index, { name, id }));
  };

  render() {
    const { todos } = this.props;

    return (
      <View>
        <Title>To-Do List</Title>
        <Input
          placeholder={"Type a todo, then hit enter!"}
          onSubmitEditing={this.onAddTodo}
        />
        <List list={todos} onPressItem={this.onRemoveTodo} />
      </View>
    );
  }
}

export default connect(mapStateToProps)(Todos);
