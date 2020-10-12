import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Cookies } from "react-cookie";
import SessionCard from "../components/SessionCard";
import TabBar from "../components/TabBar";
import TabPanel from "../components/TabPanel";
import Typography from "@material-ui/core/Typography";
import GenModal from "../components/GenModal";

const MyBookings = () => {
  const globalMemberSessions = useSelector(
    (state) => state.memberSession.memberSessions
  );
  const globalSession = useSelector((state) => state.session);
  const globalSelectedSession = globalSession.enrollingSession;
  const [bookedLessons, setbookedLessons] = useState([]);
  const [booking, setBooking] = useState({
    name: "호호수업",
    room: "101호",
    date: "2020-10-12",
    time: "19:36:00",
    max_ppl: 10,
    lesson: 8,
    user: 4,
  });
  const [userInfo, setUserInfo] = useState("");
  const [value, setValue] = useState(0);
  const handleChage = (newValue) => {
    setValue(newValue);
  };
  const UserApiUrl = `http://127.0.0.1:8000/api/myinfo/`;
  const LessonapiUrl = `http://127.0.0.1:8000/api/mylessons/`;
  let cookies = new Cookies();
  const userToken = cookies.get("usertoken");
  const apiCall = () => {
    axios
      .get(LessonapiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setbookedLessons(response.data);
      })
      .catch((response) => {
        console.error(" 오류", response);
      });
  };
  useEffect(() => {
    apiCall();
    axios
      .get(UserApiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setUserInfo(response.data[0]);
        console.log("userInfo", response.data[0].id);
      })
      .catch((response) => {
        console.error(response);
      });
  }, []);
  useEffect(() => {
    setBooking({
      ...booking,
      name: globalSelectedSession.name,
      room: globalSelectedSession.room,
      date: globalSelectedSession.date,
      time: globalSelectedSession.time,
      max_ppl: globalSelectedSession.max_ppl,
      lesson: globalSelectedSession.id,
      user: userInfo.id,
    });
  }, [globalSelectedSession]);
  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        내 스케쥴
      </Typography>
      <TabBar onChange={handleChage} menu="bookings">
        <TabPanel value={value} index={0}>
          {bookedLessons.map((enrolledSession) => (
            <SessionCard
              key={enrolledSession.id}
              enrolledSession={enrolledSession}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {bookedLessons.map((enrolledSession) => (
            <SessionCard
              key={enrolledSession.id}
              enrolledSession={enrolledSession}
              booking={globalSelectedSession}
              userInfo={userInfo}
            />
          ))}
        </TabPanel>
        Genmodal
        <GenModal />
      </TabBar>
    </>
  );
};
export default MyBookings;
