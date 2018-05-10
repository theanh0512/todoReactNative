// The actionTypes of actions that you can dispatch to modify the state of the store
import { combineReducers } from "redux";

const actionTypes = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  ADD_GOAL: "ADD_GOAL",
  REMOVE_GOAL: "REMOVE_GOAL"
};

// Helper functions to dispatch actions, optionally with payloads
const actionCreators = {
  addTodo: item => {
    return { type: actionTypes.ADD_TODO, payload: item };
  },
  removeTodo: index => {
    return { type: actionTypes.REMOVE_TODO, payload: index };
  },
  addGoal: item => {
    return { type: actionTypes.ADD_GOAL, payload: item };
  },
  removeGoal: index => {
    return { type: actionTypes.REMOVE_GOAL, payload: index };
  }
};

// Initial state of the store
const initialState = {
  todos: [
    "Click to removeTodo",
    "Learn React Native",
    "Write Code",
    "Ship App"
  ],
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
    case actionTypes.ADD_TODO: {
      return [...state, payload];
    }
    case actionTypes.REMOVE_TODO: {
      return todos.filter((todo, i) => i !== payload);
    }
  }

  return state;
};

const goalReducer = (state = initialState.goals, action) => {
  const goals = state;
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ADD_GOAL: {
      return [...state, payload];
    }
    case actionTypes.REMOVE_GOAL: {
      return goals.filter((todo, i) => i !== payload);
    }
  }

  return state;
};

//middleware function
export const checker = store => next => action => {
  console.log("here here");
  if (
    action.type === actionTypes.ADD_TODO &&
    action.payload.toLowerCase().includes("shitcoin")
  ) {
    alert("shitcoin hehe");
    return console.log("Nope. That's a bad idea");
  }
  return next(action);
};

const rootReducer = combineReducers({
  todos: todoReducer,
  goals: goalReducer
});

export const logger = store => next => action => {
  console.group(action.type);
  console.log("The action: ", action);
  const result = next(action);
  console.log("The new state: ", store.getState());
  console.groupEnd();
  return result;
};

export default {
  actionTypes,
  rootReducer,
  actionCreators
};
