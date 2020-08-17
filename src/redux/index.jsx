import { combineReducers } from "redux";

// import product from "./product";
import memberReducer from "./member";
import klassReducer from "./class";
const rootReducer = combineReducers({ memberReducer, klassReducer });
export default rootReducer;
