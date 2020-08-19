import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
import Booking from "./components/Booking";
import Board from "./components/Board";
import MyBookings from "./components/MyBookings";
import Diary from "./components/Diary";
import Voucher from "./components/Voucher";

//Read me
//컴포넌트 이름에 Styled 가 붙은 것들 ==> styled components 패키지로 css 적용된 컴포넌트임.
//material-ui 의 Link = <Link> / react-router-dom의 Link는 RouterLink로 표시.
function App() {
  return (
    <div>
      <Router>
        <ResponsiveDrawer>
          <Route path="/" component={Login} exact={true}></Route>
          <Route path="/login" component={Login} exact={true}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/main" component={Main}></Route>
          <Route path="/Booking" component={Booking}></Route>
          <Route path="/board" component={Board}></Route>
          <Route path="/diary" component={Diary}></Route>
          <Route path="/mypage/bookings" component={MyBookings}></Route>
          <Route path="/vouchers" component={Voucher}></Route>
        </ResponsiveDrawer>
      </Router>
    </div>
  );
}

export default App;
