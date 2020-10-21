import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDeleteModal, nextDeleteModal } from "../../redux/modal";
import axios from "axios";
import { Cookies } from "react-cookie";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import SuccessMsg from "../SuccessMsg";
import DialogTitle from "./DialogTitle";
import DialogContent from "./DialogContent";
import DialogActions from "./DialogActions";
import ModalButton from "./ModalButton";
import { useHistory } from "react-router-dom";

const StyledDialog = styled(Dialog)`
  width: 100%;
  .MuiDialog-paperWidthSm {
    width: 100%;
  }
`;

const DeleteBookingModal = (props) => {
  const globalModal = useSelector((state) => state.modal);
  const selectedLesson = props.selectedLesson;
  const { isDeleteModalOpen, isDeleteResultOpen } = globalModal;
  const dispatch = useDispatch();
  const postId = props.postId;
  let history = useHistory();
  const handleClose = () => {
    dispatch(closeDeleteModal());
    history.push("/board");
  };

  const onDelete = () => {
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    const deleteApiUrl = `http://api.yogayo.kr/api/posts/${postId}`;
    axios
      .delete(deleteApiUrl, {
        headers: { Authorization: `Token ${userToken}` },
      })
      .then((response) => {
        console.log(response);
        dispatch(nextDeleteModal());
      })
      .catch((response) => {
        console.error(response);
      });
  };
  return (
    <>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="modal-title"
        open={isDeleteModalOpen}
      >
        <DialogTitle onClose={handleClose}>
          <Typography variant="h4" gutterBottom>
            요가요 커뮤니티
          </Typography>
        </DialogTitle>
        <DialogContent>
          {isDeleteModalOpen && !isDeleteResultOpen && (
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: "1rem" }}
            >
              정말 삭제하시겠습니까?
            </Typography>
          )}

          {isDeleteModalOpen && isDeleteResultOpen && (
            <SuccessMsg message="게시물이 삭제되었습니다." />
          )}
        </DialogContent>
        <DialogActions>
          {isDeleteModalOpen && !isDeleteResultOpen && (
            <ModalButton
              color="primary"
              variant="contained"
              size="large"
              classes="button"
            >
              <Typography onClick={onDelete}>삭제하기</Typography>
            </ModalButton>
          )}
          {isDeleteModalOpen && isDeleteResultOpen && (
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

export default DeleteBookingModal;
