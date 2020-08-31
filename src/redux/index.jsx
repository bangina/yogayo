import { combineReducers } from "redux";

// import product from "./product";
import member from "./member";
import session from "./session";
import posts from "./posts";
const rootReducer = combineReducers({ member, session, posts });
export default rootReducer;
