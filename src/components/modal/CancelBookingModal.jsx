import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeCancelModal, nextCancelModal } from "../../redux/modal";
import axios from "axios";
import { Cookies } from "react-cookie";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import SuccessMsg from "../SuccessMsg";
import DialogTitle from "./DialogTitle";
import DialogContent from "./DialogContent";
import DialogActions from "./DialogActions";
import ModalButton from "./ModalButton";

const StyledDialog = styled(Dialog)`
  width: 100%;
  .MuiDialog-paperWidthSm {
    width: 100%;
  }
`;

const CancelBookingModal = (props) => {
  const globalModal = useSelector((state) => state.modal);
  const selectedLesson = props.selectedLesson;
  const { isCancelModalOpen, isCancelResultOpen } = globalModal;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeCancelModal());
  };
  const cancelLesson = () => {
    const CancleApiUrl = `http://api.yogayo.kr/api/mylessons/${selectedLesson.lesson}/`;
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const apiCall = () => {
      axios({
        method: "delete",
        url: CancleApiUrl,
        data: selectedLesson,
        headers: {
          Authorization: `Token	${userToken}`,
        },
      })
        .then((response) => {
          console.log("수업 취소 호출 결과 :", response);
        })
        .catch((error) => {
          console.error("수업 취소 오류", error);
          console.log("CancleApiUrl", CancleApiUrl);
        });
    };
    apiCall();
    dispatch(nextCancelModal());
  };
  return (
    <>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="modal-title"
        open={isCancelModalOpen}
      >
        <DialogTitle onClose={handleClose}>
          <Typography variant="h4" gutterBottom>
            {selectedLesson.name}
          </Typography>
          {selectedLesson.date} {selectedLesson.time}
        </DialogTitle>
        <DialogContent>
          {isCancelModalOpen && !isCancelResultOpen && (
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: "1rem" }}
            >
              정말 취소하시겠습니까?
            </Typography>
          )}

          {isCancelModalOpen && isCancelResultOpen && (
            <SuccessMsg message="수강신청 취소가 완료되었습니다." />
          )}
        </DialogContent>
        <DialogActions>
          {isCancelModalOpen && !isCancelResultOpen && (
            <ModalButton
              color="primary"
              variant="contained"
              size="large"
              classes="button"
            >
              <Typography onClick={cancelLesson}>취소하기</Typography>
            </ModalButton>
          )}
          {isCancelModalOpen && isCancelResultOpen && (
            <ModalButton
              color="primary"
              variant="contained"
              size="large"
              classes="button"
            >
              <Typography onClick={handleClose}>닫기</Typography>
            </ModalButton>
          )}
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default CancelBookingModal;
