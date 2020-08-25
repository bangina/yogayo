import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
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
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const BookingModal = (props) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [selectedKlass, setSelectedKlass] = useState(props.selectedKlass);
  const handleClose = () => {
    setIsOpen(false);
  };
  //부모 컴포넌트에서 props 업데이트 되면 모달에도 반영(바인딩 쫙 쪼여준댜)
  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props]);

  useEffect(() => {
    setSelectedKlass(props.selectedKlass);
  }, [props.selectedKlass]);
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {selectedKlass.klassName}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            취소와 변경 해당 예약은 당일 예약 변경 및 취소가 불가능합니다.
          </Typography>
          <Typography gutterBottom>
            결석 무단 결석시 이용권의 남은 횟수가 차감됩니다. 수업 종료시간까지
            입장하지 않으면 자동결석처리 됩니다.
          </Typography>
          <Typography gutterBottom>
            확인하고 수업을 예약하시겠습니까?
            <input type="checkbox" />위 이용권 예약 정책에 동의합니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            예약완료
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingModal;
