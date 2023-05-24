import { AUTHENTICATE_USER, SET_ERROR } from "../actions/types";

const initialState = {
  isUserAuthenticated: false,
  err: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        isUserAuthenticated: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        err: action.payload,
      };
    default:
      return state;
  }
};
