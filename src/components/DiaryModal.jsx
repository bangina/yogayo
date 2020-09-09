import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  //   const globalSession = useSelector((state) => state.session);
  const globalModal = useSelector((state) => state.modal);
  //   const globalSelectedSession = globalSession.enrollingSession;
  const dispatch = useDispatch();
  const validityRef = useRef();
  //예약 정책 동의 check
  const [checked, SetChecked] = useState(false);
  const [color, setColor] = useState({
    best: "",
    okay: "",
    bad: "",
  });
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
  const handleEmojiClick = (e) => {
    const selectedEmoji = e.currentTarget.value;
    switch (selectedEmoji) {
      case "best":
        setColor({
          best: "primary",
          okay: "",
          bad: "",
        });
        break;
      case "okay":
        setColor({
          best: "",
          okay: "primary",
          bad: "",
        });
        break;
      case "bad":
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
                <IconButton
                  onClick={handleEmojiClick}
                  value="best"
                  color={color.best}
                >
                  <SentimentVerySatisfiedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color={color.okay}
                  value="okay"
                  onClick={handleEmojiClick}
                >
                  <SentimentSatisfiedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color={color.bad}
                  value="bad"
                  onClick={handleEmojiClick}
                >
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
              />
            </form>
          </DialogContent>
        )}
        <DialogActions>
          <StyledButton
            color="primary"
            variant="contained"
            size="large"
            classes="button"
          >
            발행하기
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DiaryModal;
