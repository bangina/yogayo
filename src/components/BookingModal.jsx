import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, nextModal, showResult } from "../redux/session";
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
import PlaceIcon from "@material-ui/icons/Place";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import Divider from "@material-ui/core/Divider";
import { Box } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
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
  const globalSession = useSelector((state) => state.session);
  const globalSelectedSession = globalSession.enrollingSession;
  const dispatch = useDispatch();
  const validityRef = useRef();
  //예약 정책 동의 check
  const [checked, SetChecked] = useState(false);
  const handleClose = () => {
    dispatch(closeModal());
  };

  //예약하기 버튼 클릭시
  const handleInitialSubmit = () => {
    if (checked === true) {
      validityRef.current.style.display = "none";
      dispatch(nextModal());
    } else {
      validityRef.current.style.display = "flex";
    }
  };
  //예약완료 버튼 클릭시
  const handleNextSubmit = () => {
    dispatch(showResult());
  };
  const handleSubmit = () => {
    //예약 완료
    dispatch(closeModal());
  };
  const handleChange = () => {
    SetChecked(!checked);
    //누를 시점에 false인 경우(즉 false->true로 바뀔 때)
    //유효성 검사문구 숨기기
    if (checked === false) {
      validityRef.current.style.display = "none";
    }
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="modal-title"
        open={globalSession.isModalOpen}
      >
        {/* ////////////////// */}
        {/* modal header area */}
        {/* ////////////////// */}
        <DialogTitle
          id="modal-title"
          onClose={handleClose}
          style={{
            background: "#cf556c",
            color: "#fff",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {globalSelectedSession.sessionName}
          </Typography>
          {globalSelectedSession.sessionDate.toLocaleDateString()} (
          {printDay(globalSelectedSession.sessionDate.getDay())})&nbsp;
          {globalSelectedSession.startTime}
        </DialogTitle>

        {/* ////////////////// */}
        {/* modal body area */}
        {/* ////////////////// */}

        {/* body - 1단계  */}
        {globalSession.isModalOpen &&
          !globalSession.isConfirmOpen &&
          !globalSession.isResultOpen && (
            <DialogContent>
              <Typography gutterBottom>
                <AccessTimeIcon fontSize="small"></AccessTimeIcon>
                {globalSelectedSession.startTime} -{" "}
                {globalSelectedSession.endTime}
              </Typography>
              <Typography gutterBottom>
                <PlaceIcon fontSize="small"></PlaceIcon>
                {globalSelectedSession.companyName} /{" "}
                {globalSelectedSession.place}
              </Typography>
              <Typography gutterBottom>
                <FitnessCenterIcon fontSize="small"></FitnessCenterIcon>
                {globalSelectedSession.sessionName}
              </Typography>
              <Divider light />
              <Typography component="div" gutterBottom>
                <Box fontSize={16} fontWeight="fontWeightMedium" mt={1} mb={1}>
                  취소와 변경정책
                </Box>
                <Box fontSize={13}>
                  결석 무단 결석시 이용권의 남은 횟수가 차감됩니다. 수업
                  종료시간까지 입장하지 않으면 자동결석처리 됩니다.
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onClick={(e) => handleChange(e)}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="위 이용권 예약 정책에 동의합니다."
                />
                <Alert
                  severity="error"
                  ref={validityRef}
                  style={{ display: "none", width: "100%" }}
                >
                  이용권 예약 정책에 동의해주세요.
                </Alert>
              </Typography>
            </DialogContent>
          )}

        {/* ////////////////// */}
        {/*  body -  2단계 */}
        {/* ////////////////// */}
        {globalSession.isConfirmOpen && (
          <DialogContent>
            <Typography gutterBottom>
              <AccessTimeIcon fontSize="small"></AccessTimeIcon>
              솔방울 회원님
            </Typography>
            <Typography gutterBottom>
              <PlaceIcon fontSize="small"></PlaceIcon>
              현재 회원권 잔여횟수 : 3회 (남은기간 : 10일)
            </Typography>
            <Typography gutterBottom>
              수업 예약 취소/변경 기한 : 00까지
            </Typography>
            <Typography>신청하시겠습니까?</Typography>
          </DialogContent>
        )}

        {/* body 3-1. (예약 success) */}

        {globalSession.isResultOpen && (
          <DialogContent>
            <SuccessMsg />
          </DialogContent>
        )}

        {/* body 3-2. (예약 fail) */}

        {/* body 3-3. (예약 pending)-대기 완료 */}

        {/* ////////////////// */}
        {/* modal footer - buttons area */}
        {/* ////////////////// */}
        <DialogActions>
          {/* 1,2단계 모달 - 좌버튼 공통 */}
          {globalSession.isResultOpen || (
            <StyledButton onClick={handleClose} variant="outlined" size="large">
              돌아가기
            </StyledButton>
          )}
          {/* 1단계 모달 - 우버튼 */}
          {globalSession.isModalOpen &&
            !globalSession.isConfirmOpen &&
            !globalSession.isResultOpen && (
              <StyledButton
                onClick={handleInitialSubmit}
                color="primary"
                variant="contained"
                size="large"
                classes="button"
              >
                예약하기
              </StyledButton>
            )}
          {/* 2단계 모달 - 우버튼 */}
          {globalSession.isConfirmOpen && (
            <StyledButton
              onClick={handleNextSubmit}
              color="primary"
              variant="contained"
              size="large"
              classes="button"
            >
              예약완료
            </StyledButton>
          )}
          {/* 3단계 모달 - 단일버튼 */}
          {globalSession.isResultOpen && (
            <StyledButton
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              size="large"
              classes="button"
              style={{ width: "100%" }}
            >
              확인
            </StyledButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingModal;
