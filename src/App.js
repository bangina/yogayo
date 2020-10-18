import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./pages/Main";
import Booking from "./pages/Booking";
import Board from "./pages/Board";
import MyBookings from "./pages/MyBookings";
import MyPage from "./pages/MyPage";
import Diary from "./pages/Diary";
import Detail from "./pages/Detail";
import InsertBoard from "./pages/InsertBoard";
import Notifications from "./pages/Notifications";
import axios from "axios";
import { Cookies } from "react-cookie";
import AllDiary from "./pages/AllDiary";
import Modify from "./pages/Modify";

//Read me
//컴포넌트 이름에 Styled 가 붙은 것들 ==> styled components 패키지로 css 적용된 컴포넌트임.
//material-ui 의 Link = <Link> / react-router-dom의 Link는 RouterLink로 표시.
function App() {
  const [userInfo, setUserInfo] = useState({});
  const userApiCall = () => {
    const apiUrl = `http://127.0.0.1:8000/api/myinfo/`;
    // 로그인 유저 정보 불러오기
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setUserInfo(response.data[0]);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  return (
    <div>
      <Router>
        <ResponsiveDrawer userInfo={userInfo}>
          <Route path="/" component={Main} exact={true}></Route>
          <Route path="/login" component={Login} exact={true}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/main" component={Main}></Route>
          <Route path="/Booking" component={Booking}></Route>
          <Route path="/board" component={Board} exact={true}></Route>
          <Route path="/board/detail/:id" component={Detail}></Route>
          <Route path="/board/insert" component={InsertBoard}></Route>
          <Route path="/board/modify/:id" component={Modify}></Route>
          <Route path="/diary/mydiary" component={Diary}></Route>
          <Route path="/diary" component={AllDiary} exact={true}></Route>
          <Route path="/mybookings" component={MyBookings}></Route>
          {/* <Route path="/mypage" component={MyPage} exact></Route> */}
          <Route path="/mypage">
            <MyPage apiCall={userApiCall} />
          </Route>
          <Route path="/notifications" component={Notifications}></Route>
        </ResponsiveDrawer>
      </Router>
    </div>
  );
}

export default App;
