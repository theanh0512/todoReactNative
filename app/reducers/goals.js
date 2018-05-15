import { RECEIVE_DATA } from "../actions/shared";
import { ADD_GOAL, REMOVE_GOAL } from "../actions/goals";
import { generateId } from "../utils/utilFunction";

// Initial state of the store
const initialState = {
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

export default function goalReducer(state = initialState.goals, action) {
  const goals = state;
  const { type, payload } = action;

  switch (type) {
    case ADD_GOAL: {
      return [...state, payload];
    }
    case REMOVE_GOAL: {
      return goals.filter((todo, i) => i !== payload);
    }
    case RECEIVE_DATA: {
      return action.goals;
    }
  }

  return state;
}
