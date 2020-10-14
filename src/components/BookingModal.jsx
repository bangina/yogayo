import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Cookies } from "react-cookie";
import { closeModal, nextModal, showResult } from "../redux/modal";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
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
import ModalButtonLeft from "./ModalButtonLeft";
import BookingModalButtons from "./modal/BookingModalButtons";
import DialogTitle from "./modal/DialogTitle";
import DialogContent from "./modal/DialogContent";
import DialogActions from "./modal/DialogActions";

const StyledDialog = styled(Dialog)`
  width: 100%;
  .MuiDialog-paperWidthSm {
    width: 100%;
  }
`;
const BookingModal = (props) => {
  const globalLesson = useSelector((state) => state.session);
  const globalSelectedLesson = globalLesson.bookingLesson;
  const globalModal = useSelector((state) => state.modal);
  const {
    isBookingModalOpen,
    isBookingConfirmOpen,
    isBookingResultOpen,
    status,
  } = globalModal; //비구조화 할당
  const [userInfo, setUserInfo] = useState("");
  const [vouchers, setVouchers] = useState({
    date: "",
    lesson: "",
    max_ppl: "",
    name: "",
    room: "",
    time: "",
    user: "",
  });
  const [activeVoucher, setActiveVoucher] = useState("");
  const [booking, setBooking] = useState({
    name: "",
    room: "",
    date: "",
    time: "",
    max_ppl: "",
    lesson: "",
    user: "",
    voucher: "",
  });
  const dispatch = useDispatch();
  const validityRef = useRef();
  //예약 정책 동의 check
  const [checked, SetChecked] = useState(false);
  let cookies = new Cookies();
  const userToken = cookies.get("usertoken");

  useEffect(() => {
    const UserApiUrl = `http://127.0.0.1:8000/api/myinfo/`;
    const VoucherApiUrl = `http://127.0.0.1:8000/api/myvouchers/`;
    const GetApiCall = () => {
      axios
        .get(UserApiUrl, { headers: { Authorization: `Token ${userToken}` } })
        .then((response) => {
          setUserInfo(response.data[0]);
        })
        .catch((response) => {
          console.error(response);
        });
      //보유 수강권 정보 조회
      axios
        .get(VoucherApiUrl, {
          headers: { Authorization: `Token ${userToken}` },
        })
        .then((response) => {
          console.log("VoucherApiUrl", response.data);
          //status가 true(정상사용가능)인 voucher만 필터링해서 setVouchers
          setActiveVoucher(response.data.filter((d) => d.status === true));
          if (activeVoucher == true) {
            setVouchers(activeVoucher);
            console.log(activeVoucher, "activeVoucher");
          }
        })
        .catch((response) => {
          console.error(response);
        });
    };
    GetApiCall();
  }, []);

  useEffect(() => {
    if (activeVoucher.length > 0) {
      setBooking({
        ...booking,
        name: globalSelectedLesson.name,
        room: globalSelectedLesson.room,
        date: globalSelectedLesson.date,
        time: globalSelectedLesson.time,
        max_ppl: globalSelectedLesson.max_ppl,
        lesson: globalSelectedLesson.id,
        voucher: activeVoucher[0].voucher,
        user: userInfo.id,
      });
    } else {
      console.log("activevoucher 없음");
    }
    console.log(booking, "booking");
  }, [globalSelectedLesson]);

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
    if (activeVoucher.length > 0) {
      dispatch(showResult());
    } else {
      dispatch(closeModal());
    }
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
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="modal-title"
        open={isBookingModalOpen}
      >
        <DialogTitle onClose={handleClose}>
          <Typography component={"div"} variant="h4" gutterBottom>
            {globalSelectedLesson.name}
          </Typography>
          {globalSelectedLesson.date} {globalSelectedLesson.time}
        </DialogTitle>

        {isBookingModalOpen && !isBookingConfirmOpen && !isBookingResultOpen && (
          <DialogContent>
            <Typography component={"div"} gutterBottom>
              <AccessTimeIcon fontSize="small"></AccessTimeIcon>
              {globalSelectedLesson.time}
            </Typography>
            <Typography component={"div"} gutterBottom>
              <PlaceIcon fontSize="small"></PlaceIcon>
              {globalSelectedLesson.username} / {globalSelectedLesson.room}
            </Typography>
            <Typography component={"div"} gutterBottom>
              <FitnessCenterIcon fontSize="small"></FitnessCenterIcon>
              {globalSelectedLesson.name}
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
        {isBookingConfirmOpen && (
          <DialogContent>
            <Typography component={"div"} gutterBottom>
              <AccessTimeIcon fontSize="small"></AccessTimeIcon>
              {userInfo.username} 회원님
            </Typography>
            {activeVoucher.length > 0 ? (
              <>
                <Typography component={"div"} gutterBottom>
                  <PlaceIcon fontSize="small"></PlaceIcon>
                  현재 회원권 잔여횟수 : {activeVoucher[0].used}회
                </Typography>
                <Typography component={"div"} gutterBottom>
                  수업 예약 취소/변경 기한 : 수업 1일전까지
                </Typography>
                <Typography component={"div"}>신청하시겠습니까?</Typography>
              </>
            ) : (
              <>
                <Typography component={"div"} variant="h5">
                  이용가능한 회원권이 없습니다.
                </Typography>
              </>
            )}
          </DialogContent>
        )}
        {/* ////////////////// */}
        {/*  body -  3단계 */}
        {/* ////////////////// */}
        {isBookingResultOpen && (
          <DialogContent>
            <SuccessMsg message={globalModal.message} status={status} />
          </DialogContent>
        )}
        {/* ////////////////// */}
        {/*  footer -  좌/우 버튼 컴포넌트 분리*/}
        {/* ////////////////// */}
        <DialogActions>
          {/* 모달 버튼 - LEFT */}
          {/* div태그 씌운 이유? onClick 이벤트 적용하기 위해서 */}
          {!isBookingResultOpen ? (
            <div onClick={handleClose} style={{ width: "100%" }}>
              <ModalButtonLeft  >돌아가기</ModalButtonLeft>
            </div>
          ) : null}

          {/* 모달 버튼 - RIGHT */}
          <div
            onClick={
              !isBookingConfirmOpen && !isBookingResultOpen
                ? handleInitialSubmit
                : isBookingConfirmOpen
                ? handleNextSubmit
                : handleSubmit
            }
            style={{ width: "100%" }}
          >
            <BookingModalButtons
              isBookingModalOpen={isBookingModalOpen}
              isBookingConfirmOpen={isBookingConfirmOpen}
              isBookingResultOpen={isBookingResultOpen}
              booking={booking}
              disabled={activeVoucher.length <= 0}
            />
          </div>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default BookingModal;
