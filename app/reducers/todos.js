import { RECEIVE_DATA } from "../actions/shared";
import { ADD_TODO, REMOVE_TODO } from "../actions/todos";
import { generateId } from "../utils/utilFunction";

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
  ]
};
export default function todoReducer(state = initialState.todos, action) {
  const todos = state;
  const { type, payload } = action;

  switch (type) {
    case ADD_TODO: {
      return [...state, payload];
    }
    case REMOVE_TODO: {
      return todos.filter((todo, i) => i !== payload);
    }
    case RECEIVE_DATA: {
      return action.todos;
    }
  }

  return state;
}
