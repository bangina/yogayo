import React from "react";
import Button from "@material-ui/core/Button";
import { setStateTrue, setStateFalse } from "../redux/modal";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px 22px;
  font-size: 1.1rem;
`;
const ModalButtonRight = (props) => {
  const isBookingModalOpen = props.isBookingModalOpen;
  const isBookingConfirmOpen = props.isBookingConfirmOpen;
  const isBookingResultOpen = props.isBookingResultOpen;
  const booking = props.booking;
  const disabled = props.disabled;
  const dispatch = useDispatch();
  const onSubmit = () => {
    const BookingApiUrl = `http://127.0.0.1:8000/api/mylessons/${booking.lesson}/`;
    console.log("booking",booking);
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiCall = () => {
      axios({
        method: "post",
        url: BookingApiUrl,
        data: booking,
        headers: {
          Authorization: `Token	${userToken}`,
        },
      })
        .then((response) => {
          dispatch(setStateTrue());
          console.log("booking 호출 결과 :", response);
        })
        .catch((error) => {
          dispatch(setStateFalse());
          console.error("booking 오류", error);
          if (error.response.status == 400) {
            console.log("이미 신청하신 수업입니다.");
          }
        });
    };
    apiCall();
  };
  return (
    <>
      {isBookingModalOpen && !isBookingConfirmOpen && !isBookingResultOpen && (
        <StyledButton
          color="primary"
          variant="contained"
          size="large"
          classes="button"
        >
          예약하기
        </StyledButton>
      )}
      {isBookingConfirmOpen && !disabled && (
        <StyledButton
          color="primary"
          variant="contained"
          size="large"
          classes="button"
          onClick={onSubmit}
        >
          예약완료
        </StyledButton>
      )}
      {isBookingConfirmOpen && disabled && (
        <RouterLink to="/mypage">
          <StyledButton
            color="primary"
            variant="contained"
            size="large"
            classes="button"
            onClick={onSubmit}
          >
            회원권 관리
          </StyledButton>
        </RouterLink>
      )}
      {isBookingResultOpen && (
        <StyledButton
          color="primary"
          variant="contained"
          size="large"
          classes="button"
          style={{ width: "100%" }}
        >
          확인
        </StyledButton>
      )}
    </>
  );
};

export default ModalButtonRight;
