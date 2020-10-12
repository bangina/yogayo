import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Cookies } from "react-cookie";
const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px 22px;
  font-size: 1.1rem;
`;
const ModalButtonRight = (props) => {
  const dispatch = useDispatch();
  const isBookingModalOpen = props.isBookingModalOpen;
  const isBookingConfirmOpen = props.isBookingConfirmOpen;
  const isBookingResultOpen = props.isBookingResultOpen;
  const booking = props.booking;
  const onSubmit = () => {
    const BookingApiUrl = `http://127.0.0.1:8000/api/mylessons/${booking.lesson}/`;
    console.log(booking);
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
          console.log("booking 호출 결과 :", response);
        })
        .catch((error) => {
          console.error("booking 오류", error);
          if (error.response.status == 400) {
            console.log("이미 신청하신 수업입니다. :)");
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
      {isBookingConfirmOpen && (
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
