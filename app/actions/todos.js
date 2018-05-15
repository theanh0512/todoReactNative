import { deleteTodoApi } from "../API";
import { generateId } from "../utils/utilFunction";

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const addTodo = ({ item, id = generateId() }) => {
  return {
    type: ADD_TODO,
    payload: {
      id: id,
      name: item,
      complete: false
    }
  };
};

const removeTodo = index => {
  return { type: REMOVE_TODO, payload: index };
};

//redux-thunk
export function handleDeleteTodo(index, { id, name }) {
  return dispatch => {
    dispatch(removeTodo(index));

    return deleteTodoApi(id).catch(() => {
      dispatch(addTodo({ item: name, id: id }));
      alert("An error occurred. Try again.");
    });
  };
}
