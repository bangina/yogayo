import { combineReducers } from "redux";

// import product from "./product";
import memberReducer from "./member";
import klass from "./class";
import posts from "./posts";
const rootReducer = combineReducers({ memberReducer, klass, posts });
export default rootReducer;
