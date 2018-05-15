import { fetchGoals, fetchTodos } from "../API";

export const RECEIVE_DATA = "RECEIVE_DATA";

const receiveData = (todos, goals) => {
  return {
    type: RECEIVE_DATA,
    todos,
    goals
  };
};

export function handleInitialData() {
  return dispatch => {
    return Promise.all([fetchTodos(), fetchGoals()]).then(([todos, goals]) => {
      dispatch(receiveData(todos, goals));
    });
  };
}
