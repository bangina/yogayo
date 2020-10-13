import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeCancelModal, nextCancelModal } from "../redux/modal";
import axios from "axios";
import { Cookies } from "react-cookie";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import SuccessMsg from "./SuccessMsg";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#fff",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { theme, children, classes, onClose, ...other } = props;
  return (
    <>
      <MuiDialogTitle className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    </>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    justifyContent: "space-between",
  },
}))(MuiDialogActions);
const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px 22px;
  font-size: 1.1rem;
`;
const StyledDialog = styled(Dialog)`
  width: 100%;
  .MuiDialog-paperWidthSm {
    width: 100%;
  }
`;

const GenModal = (props) => {
  const globalModal = useSelector((state) => state.modal);
  const selectedLesson = props.selectedLesson;
  const { isCancelModalOpen, isCancelResultOpen } = globalModal;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeCancelModal());
  };
  const cancelLesson = () => {
    const CancleApiUrl = `http://127.0.0.1:8000/api/mylessons/${selectedLesson.lesson}/`;
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
        <DialogTitle
          id="modal-title"
          onClose={handleClose}
          style={{
            background: "#cf556c",
            color: "#fff",
          }}
        >
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
            <StyledButton
              color="primary"
              variant="contained"
              size="large"
              classes="button"
            >
              <Typography onClick={cancelLesson}>취소하기</Typography>
            </StyledButton>
          )}
          {isCancelModalOpen && isCancelResultOpen && (
            <StyledButton
              color="primary"
              variant="contained"
              size="large"
              classes="button"
            >
              <Typography onClick={handleClose}>닫기</Typography>
            </StyledButton>
          )}
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default GenModal;
