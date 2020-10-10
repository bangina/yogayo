import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Cookies } from "react-cookie";
import SessionCard from "../components/SessionCard";
import TabBar from "../components/TabBar";
import TabPanel from "../components/TabPanel";
import Typography from "@material-ui/core/Typography";

const MyBookings = () => {
  const globalMemberSessions = useSelector(
    (state) => state.memberSession.memberSessions
  );
  const enrolledSessionIds = globalMemberSessions[0].enrolledSessions; //[1,2,3]
  const globalSessions = useSelector((state) => state.session.sessions);
  const [enrolledSessions, setEnrolledSessions] = useState([]);

  const [value, setValue] = useState(0);
  const handleChage = (newValue) => {
    setValue(newValue);
  };

  const apiUrl = `http://127.0.0.1:8000/api/mylessons/`;
  let cookies = new Cookies();
  const userToken = cookies.get("usertoken");
  const apiCall = () => {
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setEnrolledSessions(response.data);
        console.log("호출 결과 :", response.data);
      })
      .catch((response) => {
        console.error(" 오류", response);
      });
  };
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        내 스케쥴
      </Typography>
      <TabBar onChange={handleChage} menu="bookings">
        <TabPanel value={value} index={0}>
          {enrolledSessions.map((enrolledSession) => (
            <SessionCard
              key={enrolledSession.id}
              enrolledSession={enrolledSession}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {enrolledSessions.map((enrolledSession) => (
            <SessionCard
              key={enrolledSession.id}
              enrolledSession={enrolledSession}
            />
          ))}
        </TabPanel>
      </TabBar>
    </>
  );
};
export default MyBookings;
