import { connect } from "react-redux";
import { addGoal, handleDeleteGoal } from "../actions/goals";
import React, { Component } from "react";
import { View } from "react-native";
import Input from "./Input";
import List from "./List";
import Title from "./Title";

const mapStateToProps = state => ({
  goals: state.goals
});

class Goals extends Component {
  onAddGoal = text => {
    const { dispatch } = this.props;

    dispatch(addGoal({ item: text }));
  };

  onRemoveGoal = (index, { id, name }) => {
    const { dispatch } = this.props;
    dispatch(handleDeleteGoal(index, { name, id }));
  };

  render() {
    const { goals } = this.props;

    return (
      <View>
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

export default connect(mapStateToProps)(Goals);
