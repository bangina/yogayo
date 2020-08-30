import { combineReducers } from "redux";

// import product from "./product";
import member from "./member";
import klass from "./class";
import posts from "./posts";
const rootReducer = combineReducers({ member, klass, posts });
export default rootReducer;
