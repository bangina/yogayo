import { combineReducers } from "redux";

// import product from "./product";
import memberReducer from "./member";
const rootReducer = combineReducers({ memberReducer });
export default rootReducer;
