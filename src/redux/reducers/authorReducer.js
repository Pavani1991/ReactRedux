import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHOR_SUCESS:
      return action.authors; // thius will be the new state
    default:
      return state;
  }
}
