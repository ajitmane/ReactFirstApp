import * as types from "./actionTypes";
import * as authorApi from "../../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createAuthor(author) {
  return { type: types.CREATE_AUTHOR, author };
}

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHOR_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
