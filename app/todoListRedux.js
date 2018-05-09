// The types of actions that you can dispatch to modify the state of the store
import { combineReducers } from "redux";

export const types = {
  ADD: "ADD",
  REMOVE: "REMOVE"
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  add: item => {
    return { type: types.ADD, payload: item };
  },
  remove: index => {
    return { type: types.REMOVE, payload: index };
  }
};

// Initial state of the store
const initialState = {
  todos: ["Click to remove", "Learn React Native", "Write Code", "Ship App"],
  goals: ["React Native", "kotlin"]
};

// Function to handle actions and update the state of the store.
// Notes:
// - The todoReducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call todoReducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
const todoReducer = (state = initialState.todos, action) => {
  const todos = state;
  const { type, payload } = action;

  switch (type) {
    case types.ADD: {
      return [...state, payload];
    }
    case types.REMOVE: {
      return todos.filter((todo, i) => i !== payload);
    }
  }

  return state;
};

const goalReducer = (state = initialState.goals, action) => {
  const goals = state;
  const { type, payload } = action;

  switch (type) {
    case types.ADD: {
      return [...state, payload];
    }
    case types.REMOVE: {
      return goals.filter((todo, i) => i !== payload);
    }
  }

  return state;
};

export const rootReducer = combineReducers({
  todos: todoReducer,
  goals: goalReducer
});
