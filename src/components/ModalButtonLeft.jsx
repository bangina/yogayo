import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px 22px;
  font-size: 1.1rem;
`;
const ModalButtonLeft = (props) => {
  const isBookingResultOpen = props.isBookingResultOpen;
  return (
    <>
      {!isBookingResultOpen ? (
        <StyledButton variant="outlined" size="large">
          돌아가기
        </StyledButton>
      ) : null}
    </>
  );
};

export default ModalButtonLeft;
