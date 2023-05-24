import { AUTHENTICATE_USER, SET_ERROR } from "./types";

export const authenticateUser = (matchedUser) => (dispatch) => {
  dispatch({
    type: AUTHENTICATE_USER,
    payload: matchedUser ? true : false,
  });
};

export const errorMessage = (err) => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: err,
  });
};
