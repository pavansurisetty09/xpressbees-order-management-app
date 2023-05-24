import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
// import OrderReducer from "./OrderReducer";

const rootReducer = combineReducers({
  authentication: AuthReducer,
  // orders: OrderReducer,
});

export default rootReducer;
