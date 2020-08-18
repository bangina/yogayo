import { combineReducers } from "redux";

// import product from "./product";
import memberReducer from "./member";
import klassReducer from "./class";
import posts from "./posts";
const rootReducer = combineReducers({ memberReducer, klassReducer, posts });
export default rootReducer;
