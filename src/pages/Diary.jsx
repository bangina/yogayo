import React from "react";
import DiaryCard from "../components/DiaryCard";
import Button from "@material-ui/core/Button";

const Diary = () => {
  return (
    <div>
      <h2>오늘 수련은 어떠셨나요?</h2>
      <p>수련일기는 수련 후 24시간 이내에만 작성가능합니다.</p>
      {/* <p>(?)월경일 입력기능</p>
      <p>수련소감 좋음/보통/별로 체크->이 달의 통계 보여주기</p> */}

      <h3>작성 가능한 일기</h3>
      <p>8월 30일</p>
      <Button color="primary" variant="contained" size="large">
        아쉬탕가 수업 일기 작성하기
      </Button>
      <p>8월 31일</p>
      <Button color="primary" variant="contained" size="large">
        빈야사 수업 일기 작성하기
      </Button>
      <br />
      <br />
      <br />
      <DiaryCard />
    </div>
  );
};

export default Diary;
