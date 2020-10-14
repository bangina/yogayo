import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import { closeDiaryModal } from "../redux/modal";
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
import Avatar from "@material-ui/core/Avatar";
import DropDown from "../components/DropDown";
import TextField from "@material-ui/core/TextField";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import axios from "axios";
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
    "& form>*": {
      minWidth: "300px",
    },
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

const DiaryModal = (props) => {
  //   const globalLesson = useSelector((state) => state.session);
  const globalModal = useSelector((state) => state.modal);
  //   const globalSelectedLesson = globalLesson.bookingLesson;
  const dispatch = useDispatch();
  const validityRef = useRef();
  //예약 정책 동의 check
  const [checked, SetChecked] = useState(false);
  const [color, setColor] = useState({
    best: "",
    okay: "",
    bad: "",
  });
  const [diaryContents, setDiarycontents] = useState({
    userLesson: props.id, //임시임
    content: "test",
    mood: "1",
  });
  const [selectecFile, setSelectedFile] = useState("");
  const handleClose = () => {
    dispatch(closeDiaryModal());
  };

  const handleChange = () => {
    SetChecked(!checked);
    //누를 시점에 false인 경우(즉 false->true로 바뀔 때)
    //유효성 검사문구 숨기기
    if (checked === false) {
      validityRef.current.style.display = "none";
    }
  };
  const selectFile = (e) => {
    setSelectedFile(e.target.files);
  };
  const onInputChange = (e) => {
    setDiarycontents({ ...diaryContents, [e.target.name]: e.target.value });
    console.log(diaryContents);
  };
  const onSubmit = () => {
    let cookies = new Cookies();
    const userToken = cookies.get("usertoken");
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/diaries/1/upload/",
      data: diaryContents,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Token ${userToken}`,
      }, //:파일데이터 보낼 때 컨텐츠 유형임.
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  const onMoodChange = (e) => {
    const selectedEmoji = e.currentTarget.value;
    setDiarycontents({ ...diaryContents, mood: selectedEmoji });
    switch (selectedEmoji) {
      case "2":
        setColor({
          best: "primary",
          okay: "",
          bad: "",
        });
        break;
      case "1":
        setColor({
          best: "",
          okay: "primary",
          bad: "",
        });
        break;
      case "0":
        setColor({
          best: "",
          okay: "",
          bad: "primary",
        });
        break;
      default:
        setColor({
          best: "",
          okay: "",
          bad: "",
        });
    }
    console.log(diaryContents);
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="modal-title"
        open={globalModal.isDiaryModalOpen}
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
            오늘의 수련일기
          </Typography>
          아쉬탕가 중급
        </DialogTitle>
        {globalModal.isDiaryModalOpen && (
          <DialogContent>
            <div>
              <Avatar />
              <Typography style={{ display: "inline-block" }}>
                솔방울 회원님
              </Typography>
              <div style={{ float: "right" }}>
                <Typography style={{ display: "inline-block" }}>
                  오늘 기분
                </Typography>
                <IconButton value="2" color={color.best} onClick={onMoodChange}>
                  <SentimentVerySatisfiedIcon fontSize="small" />
                </IconButton>
                <IconButton color={color.okay} value="1" onClick={onMoodChange}>
                  <SentimentSatisfiedIcon fontSize="small" />
                </IconButton>
                <IconButton color={color.bad} value="0" onClick={onMoodChange}>
                  <SentimentDissatisfiedIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
            <DropDown
              title="공개 여부"
              value={["전체 공개 🌏", "나만 보기 🔑"]}
              onChange={(value) => console.log(value)}
              style={{ display: "block" }}
            />
            <form action="">
              <TextField
                id="diary-text"
                label="오늘 수련은 어떠셨나요?"
                multiline
                rows={4}
                defaultValue=" "
                variant="outlined"
                name="content"
                value={diaryContents.content}
                onChange={onInputChange}
              />
            </form>
          </DialogContent>
        )}
        <input
          type="file"
          id="imgUpload"
          onChange={(e) => selectFile(e)}
        ></input>
        <label htmlFor="imgUpload">사진 올리기</label>
        <DialogActions>
          <StyledButton
            color="primary"
            variant="contained"
            size="large"
            classes="button"
            onClick={onSubmit}
          >
            발행하기
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DiaryModal;
