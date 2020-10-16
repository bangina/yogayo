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
  const [page, setPage] = useState(1)
  const [cnt , setCnt] = useState()
  
  const apiCall = (pageNum) => {
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiUrl = `http://127.0.0.1:8000/api/diaries/?page=${pageNum}`;
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

  const loadMore = () => {
      setPage(page + 1)
  };

  useEffect(() => {
    apiCall(page);
  }, [page]);
  
  
  
  return (
    <div>
      <Typography variant="h4" gutterBottom color="primary">
        오늘의 요기 피드
      </Typography>
      <Button
          onClick={() => props.history.push('/diary/mydiary')}
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
          일기 작성하러 가좌~!@
        </Button>
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
      
      <DiaryModal></DiaryModal>
    </div>
  );
};

export default AllDiary;
