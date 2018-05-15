import { ADD_TODO } from "../actions/todos";

const checker = store => next => action => {
  console.log("here here");
  if (
    action.type === ADD_TODO &&
    action.payload.name.toLowerCase().includes("shitcoin")
  ) {
    alert("shitcoin hehe");
    return console.log("Nope. That's a bad idea");
  }
  return next(action);
};

export default checker;
