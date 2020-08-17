import React, { useState, useEffect } from "react";
import { changeDate } from "../redux/class";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const BookingCalendar = () => {
  const dispatch = useDispatch();
  //value state에 날짜 객체를 저장
  const [value, setValue] = useState(new Date());

  //선택된 날짜를 redux에 보내기(=>selectedDate에 담김)
  useEffect(() => {
    dispatch(changeDate(value));
    console.log(value);
  }, [value]);
  const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
  const StyledCalendar = styled(Calendar)`
    border: none;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    margin: auto;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.15);
    .react-calendar__navigation {
      button {
        border-radius: 10px;
      }
    }
    .react-calendar__tile {
      border-radius: 10px;
      font-size: 1rem;
      color: #444;
      &--active {
        background: #cf556c;
        color: #fff;
        &:hover {
          background: #cf556c;
        }
      }
      &--now {
        /* background: #cf556c; */
        /* color: #fff; */
      }
    }
    .react-calendar__tile:disabled {
      background: rgba(0, 0, 0, 0.02);
      color: #999;
    }
    /* 캘린더 비활성화 버튼(YYYY M) */
    .react-calendar__navigation button[disabled] {
      background-color: #fff !important;
    }

    .react-calendar__navigation__arrow.react-calendar__navigation__prev-button[disabled] {
      background-color: #f0f0f0 !important;
    }
  `;
  return (
    <div>
      <h2>{value.toLocaleDateString()}</h2>
      <StyledCalendar
        onChange={setValue}
        minDetail="month"
        defaultValue={new Date()}
        value={value}
        //오늘부터 선택가능
        minDate={new Date()}
        // 오늘로부터 한달까지만 선택 가능
        maxDate={maxDate}
        //next year 버튼 텍스트 없앰
        next2Label=""
        prev2Label=""
        //수업 없는 날은 비활성화 시키는 기능 추가?
        tileDisabled={({ activeStartDate, date, view }) => date.getDay() === 0}
        locale="ko"
      />
    </div>
  );
};

export default BookingCalendar;
