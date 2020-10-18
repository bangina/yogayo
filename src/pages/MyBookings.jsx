import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Cookies } from "react-cookie";
import Timeline from "@material-ui/lab/Timeline";
import styled from "styled-components";
import TabBar from "../components/TabBar";
import TabPanel from "../components/TabPanel";
import Typography from "@material-ui/core/Typography";
import CancelBookingModal from "../components/modal/CancelBookingModal";
import BookingCard from "../components/BookingCard";

const StyledTimeline = styled(Timeline)`
  color: red;
  padding: 0;
  .MuiTimeline-root {
    padding: 0;
  }
  .MuiTimelineContent-root {
    padding: 6px 0;
  }
  .MuiTimelineItem-missingOppositeContent:before {
    flex: 0;
  }
  .MuiTimelineItem-missingOppositeContent:before {
    padding: 0;
  }
  .MuiTimelineSeparator-root {
    margin-right: 5px;
  }
  .MuiTimelineDot-root {
    color: #fff;
    background: rgba(207, 85, 108, 1);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    line-height: 50px;
    padding: 0;
    margin-bottom: 0;
    text-align: center;
    display: block;
    margin-top: 0;
  }
  .MuiTimelineConnector-root {
    background: rgba(0, 0, 0, 0.15);
    width: 1px;
  }
`;

const MyBookings = () => {
  const globalMemberSessions = useSelector(
    (state) => state.memberSession.memberSessions
  );
  const globalLesson = useSelector((state) => state.session);
  const globalModal = useSelector((state) => state.modal);
  const globalSelectedLesson = globalLesson.bookingLesson;
  const [bookedLessons, setbookedLessons] = useState([{
    date: "",
    id: "",
    lesson: "",
    max_ppl: "",
    name: "",
    room: "",
    time: "",
    user: "",
    voucher: ""
  }
  ]);
  const today = new Date();
  const year = `${today.getFullYear()}`;
  const month = today.getMonth()+1>9? `${today.getMonth()+1}` : `0${today.getMonth()+1}`;
  const date = today.getDate()>9? `${today.getDate()}` : `0${today.getDate()}`;
  const todayDate = Number(year + month + date); //20201016
  console.log(todayDate)
  //지난 수업
  const pastLessons =bookedLessons.filter((lesson)=>Number(lesson.date.replace(/-/g,''))<todayDate);
  //예정 수업
  const futureLessons =bookedLessons.filter((lesson)=>Number(lesson.date.replace(/-/g,''))>=todayDate);
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
        console.log("setbookedLessons", response.data);
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
      })
      .catch((response) => {
        console.error(response);
      });
  }, [globalModal.isCancelModalOpen]); //모달 닫히면 재렌더링 되도록함.
  useEffect(() => {
    setBooking({
      ...booking,
      name: globalSelectedLesson.name,
      room: globalSelectedLesson.room,
      date: globalSelectedLesson.date,
      time: globalSelectedLesson.time,
      max_ppl: globalSelectedLesson.max_ppl,
      lesson: globalSelectedLesson.id,
      user: userInfo.id,
    });
  }, [globalSelectedLesson]);
  return (
    <>
    <StyledTimeline>
      <Typography variant="h4" gutterBottom color="primary">
        내 스케쥴
      </Typography>
      <TabBar onChange={handleChage} menu="bookings">
        <TabPanel value={value} index={0}>
          {/* 아직 시작되지 않은 수업 */}
          {futureLessons.map((bookedLesson, index) => ( 
          <BookingCard session={bookedLesson} key={bookedLesson.id} type="cancel" />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* 이미 시작한 수업(지난 수업) */}
          {pastLessons.map((bookedLesson, index) => ( 
          <BookingCard session={bookedLesson} key={bookedLesson.id} type="diary" />
          ))}
        </TabPanel>
        <CancelBookingModal selectedLesson={globalSelectedLesson} />
      </TabBar>
      </StyledTimeline>
    </>
  );
};
export default MyBookings;
