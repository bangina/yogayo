import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../redux/class";
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
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Divider from "@material-ui/core/Divider";
import { Box } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    // color: theme.palette.grey[500],
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
  width: 49%;
  padding: 12px 22px;
  font-size: 1.1rem;
`;
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
    case 7:
      return "일";
    default:
      return "";
  }
};
const BookingModal = (props) => {
  const globalklass = useSelector((state) => state.klass);
  const globalSelectedKlass = globalklass.enrollingKlass;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={globalklass.isModalOpen}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{
            background: "#cf556c",
            // "linear-gradient(to left, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
            color: "#fff",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {globalSelectedKlass.klassName}
          </Typography>
          {globalSelectedKlass.klassDate.toLocaleDateString()} (
          {printDay(globalSelectedKlass.klassDate.getDay())})&nbsp;
          {globalSelectedKlass.startTime}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <AccessTimeIcon fontSize="small"></AccessTimeIcon>
            {globalSelectedKlass.startTime} - {globalSelectedKlass.endTime}
          </Typography>
          <Divider light />
          <Typography component="div" gutterBottom>
            <Box fontSize={16} fontWeight="fontWeightMedium" mt={1} mb={1}>
              취소와 변경정책
            </Box>
            <Box fontSize={14}>
              결석 무단 결석시 이용권의 남은 횟수가 차감됩니다. 수업
              종료시간까지 입장하지 않으면 자동결석처리 됩니다.
            </Box>
            <Box fontSize={16} fontWeight="fontWeightMedium" mt={1} mb={1}>
              결석에 대한 정책
            </Box>
            <Box fontSize={14}>
              결석 무단 결석시 이용권의 남은 횟수가 차감됩니다. 수업
              종료시간까지 입장하지 않으면 자동결석처리 됩니다.
            </Box>
            <Divider />
            <input type="checkbox" />위 이용권 예약 정책에 동의합니다.
            <Box fontSize={16} fontWeight="fontWeightMedium">
              확인하고 수업을 예약하시겠습니까?
            </Box>
          </Typography>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose} variant="outlined" size="large">
            돌아가기
          </StyledButton>
          <StyledButton
            onClick={handleClose}
            color="primary"
            variant="contained"
            size="large"
            classes="button"
          >
            예약완료
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingModal;
