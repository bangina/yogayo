import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeResultModal } from "../../redux/modal";
import axios from "axios";

import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import SuccessMsg from "../SuccessMsg";
import DialogTitle from "./DialogTitle";
import DialogContent from "./DialogContent";
import DialogActions from "./DialogActions";
import ModalButton from "./ModalButton";
import SuccessSVG from "../SuccessSVG";
const StyledDialog = styled(Dialog)`
  width: 100%;
  .MuiDialog-paperWidthSm {
    width: 100%;
  }
`;
const ResultModal = (props) => {
const globalModal = useSelector((state) => state.modal);
const { isResultModalOpen} = globalModal;
const dispatch = useDispatch();
const directTo = props.directTo;
const message = props.message;
const handleClose = () => {
    dispatch(closeResultModal());
  };
    return (
        <StyledDialog
        onClose={handleClose}
        aria-labelledby="modal-title"
        open={isResultModalOpen}
      >
           <DialogTitle onClose={handleClose}>
          <Typography variant="h4" gutterBottom>
            요가요 커뮤니티
          </Typography>
        </DialogTitle>
        <DialogContent >
        <SuccessSVG/>
        <Typography
            variant="h6"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
              {message}
            </Typography>
        </DialogContent>
        <DialogActions>
            <RouterLink to={directTo} style={{width:"100%"}}>
        <ModalButton
              color="primary"
              variant="contained"
              size="large"
              classes="button"
            >
              <Typography onClick={handleClose}>닫기</Typography>
            </ModalButton>
            </RouterLink>
            </DialogActions>
          </StyledDialog>
    );
};

export default ResultModal;