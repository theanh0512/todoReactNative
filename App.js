/**
 * App is connected to the store using connect(). It pulls the list data, todos,
 * out of the store's state using mapStateToProps.
 * It uses the dispatch() function added to its props to dispatch actions to modify the store.
 */

import React, { Component } from "react";
import ConnectedTodos from "./app/components/Todos";
import ConnectedGoals from "./app/components/Goals";
import { View } from "react-native";
import Title from "./app/components/Title";
import { connect } from "react-redux";
import { handleInitialData } from "./app/actions/shared";

const mapStateToProps = state => ({
  loading: state.loading
});

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;

    if (loading === true) {
      return (
        <View>
          <Title>LOADING</Title>
        </View>
      );
    }

    return (
      <View>
        <ConnectedTodos />
        <ConnectedGoals />
      </View>
    );
  }
}

export default connect(mapStateToProps)(App);
