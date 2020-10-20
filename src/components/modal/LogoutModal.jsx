import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeLogoutModal } from "../../redux/modal";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "./DialogTitle";
import DialogContent from "./DialogContent";
import DialogActions from "./DialogActions";
import ModalButton from "./ModalButton";
import { Cookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const StyledDialog = styled(Dialog)`
  width: 100%;
  .MuiDialog-paperWidthSm {
    width: 100%;
  }
`;
const LogoutModal = (props) => {
  const globalModal = useSelector((state) => state.modal);
  const isLogoutModalOpen = globalModal.isLogoutModalOpen;
  const dispatch = useDispatch();

  //로그아웃 처리하기
  const cookies = new Cookies();
  const handleClose = () => {
    dispatch(closeLogoutModal());
    cookies.remove("usertoken");
    //부모컴포넌트 리렌더링(유저정보 다시 가져오기)
    window.location = "/";
  };
  return (
    <>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="modal-title"
        open={isLogoutModalOpen}
      >
        <DialogTitle onClose={handleClose}>
          <Typography component={"div"} variant="h4" gutterBottom>
            로그아웃
          </Typography>
          로그아웃
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            로그아웃하시겠습니까?
          </Typography>
        </DialogContent>
        <DialogActions>
          <div onClick={handleClose} style={{ width: "100%" }}>
            <ModalButton
              color="primary"
              variant="contained"
              size="large"
              classes="button"
            >
              로그아웃
            </ModalButton>
          </div>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default LogoutModal;
