import React, { useState, useEffect } from "react";
import DiaryCard from "../components/DiaryCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DiaryModal from "../components/modal/DiaryModal";
import axios from "axios";
import { Cookies } from "react-cookie";

const AllDiary = (props) => {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [cnt, setCnt] = useState();

  const apiCall = (pageNum) => {
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiUrl = `http://api.yogayo.kr/api/diaries/?page=${pageNum}`;
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        const tempArr = contents.concat(response.data.results);
        setContents(tempArr);
        setCnt(response.data.count);
        console.log("다이어리 목록 : ", response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  const apiCall2 = () => {
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiUrl = `http://api.yogayo.kr/api/diaries/?page=1`;
    axios
      .get(apiUrl, { headers: { Authorization: `Token ${userToken}` } })
      .then((response) => {
        // const tempArr = contents.concat(response.data.results);
        setContents(response.data.results);
        setCnt(response.data.count);
        console.log("apiCall2 목록 : ", response.data);
      })
      .catch((response) => {
        console.error(response);
      });
  };

  const loadMore = () => {
    setPage(page + 1);
  };
  const printDay = (props) => {
    switch (props) {
      case 1:
        return "월";
      case 2:
        return "화";
      case 3:
        return "수";
      case 4:
        return "목";
      case 5:
        return "금";
      case 6:
        return "토";
      case 0:
        return "일";
      default:
        return "";
    }
  };

  useEffect(() => {
    apiCall(page);
  }, [page]);

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        style={{ paddingBottom: "1rem" }}
      >
        오늘의 요기 피드
      </Typography>
      <Typography
        style={{
          color: "#555",
          fontSize: "1rem",
          lineHeight: 1.5,
        }}
      >
        {new Date().getMonth() + 1}월 {new Date().getDate()}일{" "}
        {printDay(new Date().getDay())}요일,
        <br />
        오늘 올라온 다른 <b>요가요 회원들의 수련 후기</b>를 구경해보세요.
      </Typography>
      <br />
      <Button
        onClick={() => props.history.push("/diary/mydiary")}
        variant="contained"
        color="primary"
        size="large"
        style={{
          position: "relative",
          // left: "50%",
          // transform: "translateX(-50%)",
          marginTop: "1rem",
        }}
      >
        <b>수련일기</b>&nbsp;쓰러가기
      </Button>
      <br />
      <br />
      <br />
      <Grid container spacing={3}>
        {contents.map((content, index) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={index}>
            <DiaryCard content={content} apiCall={apiCall2} />
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

      <DiaryModal></DiaryModal>
    </div>
  );
};

export default AllDiary;
