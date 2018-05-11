// The actionTypes of actions that you can dispatch to modify the state of the store
import { combineReducers } from "redux";

const actionTypes = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  ADD_GOAL: "ADD_GOAL",
  REMOVE_GOAL: "REMOVE_GOAL",
  RECEIVE_DATA: "RECEIVE_DATA"
};

// Helper functions to dispatch actions, optionally with payloads
const actionCreators = {
  addTodo: ({ item, id = generateId() }) => {
    return {
      type: actionTypes.ADD_TODO,
      payload: {
        id: id,
        name: item,
        complete: false
      }
    };
  },
  removeTodo: index => {
    return { type: actionTypes.REMOVE_TODO, payload: index };
  },
  addGoal: ({ item, id = generateId() }) => {
    return {
      type: actionTypes.ADD_GOAL,
      payload: {
        id: id,
        name: item,
        complete: false
      }
    };
  },
  removeGoal: index => {
    return { type: actionTypes.REMOVE_GOAL, payload: index };
  },
  receiveData: (todos, goals) => {
    return {
      type: actionTypes.RECEIVE_DATA,
      todos,
      goals
    };
  }
};

function generateId() {
  return Math.random()
    .toString(36)
    .substring(2);
}

// Initial state of the store
const initialState = {
  todos: [
    {
      id: generateId(),
      name: "Do tasks",
      complete: false
    },
    {
      id: generateId(),
      name: "Learn React Native",
      complete: false
    },
    {
      id: generateId(),
      name: "Write Code",
      complete: true
    }
  ],
  goals: [
    {
      id: generateId(),
      name: "Learn Kotlin"
    },
    {
      id: generateId(),
      name: "Raise fishes"
    }
  ]
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
    case actionTypes.RECEIVE_DATA: {
      return action.todos;
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
    case actionTypes.RECEIVE_DATA: {
      return action.goals;
    }
  }

  return state;
};

const loadingReducer = (state = true, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_DATA:
      return false;
    default:
      return state;
  }
};

//middleware function
export const checker = store => next => action => {
  console.log("here here");
  if (
    action.type === actionTypes.ADD_TODO &&
    action.payload.name.toLowerCase().includes("shitcoin")
  ) {
    alert("shitcoin hehe");
    return console.log("Nope. That's a bad idea");
  }
  return next(action);
};

const rootReducer = combineReducers({
  todos: todoReducer,
  goals: goalReducer,
  loading: loadingReducer
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
  loadingReducer,
  actionCreators
};
