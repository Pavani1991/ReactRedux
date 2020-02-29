import * as types from "../actions/actionTypes";

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      console.log("In reducer");
      return [...state, { ...action.course }];
    default:
      return state;
  }
}
