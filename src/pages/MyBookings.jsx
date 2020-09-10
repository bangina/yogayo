import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  const enrolledSessions = [];
  for (let i = 1; i <= enrolledSessionIds.length; i++) {
    enrolledSessions.push(
      globalSessions.filter((globalSession) => globalSession.id === i)
    );
  }
  console.log(enrolledSessionIds);
  console.log(globalSessions);
  console.log("enrolledSessions", enrolledSessions);

  const [value, setValue] = useState(0);

  const handleChage = (newValue) => {
    setValue(newValue);
  };

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
