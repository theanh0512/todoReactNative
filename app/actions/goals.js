import { deleteGoalApi } from "../API";
import { generateId } from "../utils/utilFunction";

export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";
export const addGoal = ({ item, id = generateId() }) => {
  return {
    type: ADD_GOAL,
    payload: {
      id: id,
      name: item,
      complete: false
    }
  };
};

const removeGoal = index => {
  return { type: REMOVE_GOAL, payload: index };
};

//redux-thunk
export function handleDeleteGoal(index, { id, name }) {
  return dispatch => {
    dispatch(removeGoal(index));

    return deleteGoalApi(id).catch(() => {
      dispatch(addGoal({ item: name, id: id }));
      alert("An error occurred. Try again.");
    });
  };
}
