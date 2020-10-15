import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import { closeDiaryModal } from "../../redux/modal";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import DropDown from "../DropDown";
import TextField from "@material-ui/core/TextField";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import DialogTitle from "./DialogTitle";
import DialogContent from "./DialogContent";
import DialogActions from "./DialogActions";
const StyledButton = styled(Button)`
  width: 49%;
  padding: 12px 22px;
  font-size: 1.1rem;
`;
const StyledDialog = styled(Dialog)`
  width: 100%;
  .MuiDialog-paperWidthSm {
    width: 100%;
  }
`;

const useStyles = makeStyles((theme) => ({
  headingTxt:{

  },
  moodTxt:{
    fontSize: "12px",
    marginBottom: "1rem"
  },
  textfield: {
    width : "100%"
  },
  uploadInput:{
    display: "none"
  },
  uploadBox:{
    border: "1px solid rgba(207, 85, 108, 0.5)",
    margin: "24px",
    padding: "12px",
    borderRadius: "4px",
    verticalAlign: "middle",
  },
  uploadBtn:{
    display: "inline-block",
    width : "50px",
    height : "50px",
    padding: "0",
    color: "#cf556c",
    border: "1px solid rgba(207, 85, 108, 0.5)",
    borderRadius:"50%",
    textAlign:"center",
    lineHeight: "60px",
    boxShadow: "2px 2px 3px rgba(0,0,0,0.1)",
    cursor: "pointer",
    margin : "0 auto"
  },
  uploadTxt:{
    color: "#cf556c",
    marginBottom: "10px",
  },
  submitBtn:{
    width : "100% !important",
  },
  photoBox:{
    width : "100%",
  },
  photo:{
    width : "100%",
    marginTop: "1rem",
    borderRadius: "4px"
  }

}));

const Diary = (props) => {
  const classes = useStyles();
  const globalModal = useSelector((state) => state.modal);
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
    content: "",
    mood: "",
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
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="modal-title"
        open={globalModal.isDiaryModalOpen}
      >
        <DialogTitle onClose={handleClose}>
          <Typography variant="h4" gutterBottom>
            수련일기 작성하기
          </Typography>
        </DialogTitle>
        {globalModal.isDiaryModalOpen && (
          <DialogContent style={{ overflowY: "initial"}}>
            <div>
              <Typography className={classes.headingTxt} style={{ display: "inline-block", marginBottom: "10px" }}>
          이번 "아쉬탕가 중급 수업"은 어떠셨나요?
              </Typography> 
              <br/>
              <div style={{ float: "right" }}>
                <IconButton value="2" color={color.best} onClick={onMoodChange}>
                  <SentimentVerySatisfiedIcon fontSize="small" /><span className={classes.moodTxt}>좋았어요</span>
                </IconButton>
                <IconButton color={color.okay} value="1" onClick={onMoodChange}>
                  <SentimentSatisfiedIcon fontSize="small" /><span className={classes.moodTxt}>보통이었어요</span>
                </IconButton>
                <IconButton color={color.bad} value="0" onClick={onMoodChange}>
                  <SentimentDissatisfiedIcon fontSize="small" /><span className={classes.moodTxt}>별로였어요</span>
                </IconButton>
              </div>
            </div>
            <form className={classes.form}>
              <TextField
                id="diary-text"
                label="수련하면서 느낀 점을 적어보세요."
                multiline
                rows={6}
                variant="outlined"
                name="content"
                value={diaryContents.content}
                onChange={onInputChange}
                className={classes.textfield}
              />
            </form>
          </DialogContent>
        )}
        <input
          type="file"
          id="imgUpload"
          onChange={(e) => selectFile(e)}
          className={classes.uploadInput}
        ></input>
        <div className={classes.uploadBox}>
        <label htmlFor="imgUpload" className={classes.uploadBtn}><PhotoCameraIcon/></label>
        <span className={classes.uploadTxt}>사진을 첨부해주세요.</span>
        <div className={classes.photoBox}>
          <img src="/diaryphoto.png" alt="" className={classes.photo}/>
        </div>
        </div>
        <DialogActions>
          <StyledButton
            color="primary"
            variant="contained"
            size="large"
            className={classes.submitBtn}
            onClick={onSubmit}
          >
            발행하기
          </StyledButton>
        </DialogActions>
    </StyledDialog>
    </>
  );
};

export default Diary;
