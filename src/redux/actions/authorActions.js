import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHOR_SUCESS, authors };
}

export function loadAuthors() {
  return function(dispatch) {
    // this syntax is important as it will be utilized by thunk middleware. Middleware passes dispatch down to the thnk
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        throw error;
      });
  };
}
