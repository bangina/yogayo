import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openDiaryModal } from "../redux/modal";
import DiaryCard from "../components/DiaryCard";
import LessonCard from "../components/LessonCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DiaryModal from "../components/modal/DiaryModal";
import ResultModal from "../components/modal/ResultModal";
import axios from "axios";
import { Cookies } from "react-cookie";

const Diary = () => {
  const [pendingContents, setPendingContents] = useState([]);
  const [page, setPage] = useState(1);
  const [cnt , setCnt] = useState()

  const lessonCall = () => {
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiUrl = `http://127.0.0.1:8000/api/diaries/lessons/`;
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        setPendingContents(response.data);
        console.log("수업 목록 : ", response.data)
      })
      .catch((response) => {
        console.error(response);
      });
  }
  
  const apiCall = (pageNum) => {
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiUrl = `http://127.0.0.1:8000/api/diaries/mydiaries/?page=${pageNum}`;
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        const tempArr = contents.concat(response.data.results)
        setContents(tempArr)
        setCnt(response.data.count)
        console.log("다이어리 목록 : ", response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  };
  const [contents, setContents] = useState([]);
  const globalModal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const loadMore = () => {
    setPage(page + 1)
  };
  const openModal = (id) => {
    dispatch(openDiaryModal(id));
  };
  useEffect(() => {
    lessonCall();
  }, []);

  useEffect(()=>{
    apiCall(page)
  },[page,globalModal]);
  return (
    <div>
      <Typography variant="h4" gutterBottom color="primary">
        오늘의 수련일기
      </Typography>
      <Typography variant="" gutterBottom color="">
        {/* {new Date().getFullYear()}년 {new Date().getMonth() + 1}월{" "} */}
        {/* {new Date().getDate()}일, {printDay(new Date().getDay())}요일 */}
      </Typography>
      <p
        className="msg-box"
        style={{
          background: "rgba(0,0,0,0.05)",
          borderRadius: "5px",
          color: "#333",
          padding: "0 1rem",
          lineHeight: "3rem",
          fontSize: "1rem",
          textIndent: "0px",
        }}
      >
        오늘 수련은 어떠셨나요?
        <img src="./yogayo_logo.svg" style={{ width: "40px" }} alt="logo" />
      </p>
      <Typography variant="" gutterBottom color="">
        오늘 작성 가능한 일기
        <br />
        (수련일기는 수련 후 24시간 이내에만 작성가능합니다.)
      </Typography>

      <br />
      <br />
        {pendingContents.map((content) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={content.id}>
            <div >
              <LessonCard content={content} onClick={()=>openModal(content)} />
            </div>
          </Grid>
        ))}
      <br />
      <br />
      <Typography variant="h4" gutterBottom color="primary">
        나의 일기
      </Typography>
      <br />
      <br />
      <br />
      <Grid container spacing={3}>
        {contents.map((content, index) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={index}>
            <DiaryCard content={content} apiCall={apiCall} />
          </Grid>
        ))}
      </Grid>
      {contents.length !== cnt ? (
        <Button
        onClick={loadMore}
        variant="outlined"
        color="primary"
        size="large"
        style={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "1rem",
        }}
      >
        더 보기
      </Button>
    ) : null}
      <DiaryModal />

    <ResultModal directTo="/diary" message="다이어리가 정상적으로 게시되었습니다."/>
    
    </div>
  );
};

export default Diary;
