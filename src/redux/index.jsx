import { combineReducers } from "redux";

// import product from "./product";
import member from "./member";
import session from "./session";
import posts from "./posts";
import modal from "./modal";
const rootReducer = combineReducers({ member, session, posts, modal });
export default rootReducer;
