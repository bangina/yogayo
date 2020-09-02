import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { closeModal } from "../redux/modal";

const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px 22px;
  font-size: 1.1rem;
`;
const ModalButtonRight = (props) => {
  const dispatch = useDispatch();
  const isModalOpen = props.isModalOpen;
  const isConfirmOpen = props.isConfirmOpen;
  const isResultOpen = props.isResultOpen;
  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <>
      {isModalOpen && !isConfirmOpen && !isResultOpen && (
        <StyledButton
          color="primary"
          variant="contained"
          size="large"
          classes="button"
        >
          예약하기
        </StyledButton>
      )}
      {isConfirmOpen && (
        <StyledButton
          color="primary"
          variant="contained"
          size="large"
          classes="button"
        >
          예약완료
        </StyledButton>
      )}
      {isResultOpen && (
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
