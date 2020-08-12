import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <ResponsiveDrawer>
          <Route path="/" component={Login} exact={true}></Route>
          <Route path="/login" component={Login} exact={true}></Route>
          <Route path="/signup" component={Signup}></Route>
        </ResponsiveDrawer>
      </Router>
    </div>
  );
}

export default App;
