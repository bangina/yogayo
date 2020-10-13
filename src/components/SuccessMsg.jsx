import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const StyledSvg = styled.svg`
  #circle,
  #check {
    animation: checkAnim 0.5s ease-in;
  }
  @keyframes checkAnim {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const SuccessMsg = (props) => {
  const message = props.message;
  const status = props.status;
  return (
    <>
      {status === true ? (
        <>
          <div style={{ textAlign: "center" }}>
            <StyledSvg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="check"
                  d="M21.6408 29.3631C20.6531 28.2855 18.9469 28.1957 17.8694 29.1835C16.7918 30.1712 16.702 31.8773 17.6898 32.9549L31.249 47.6814C31.7878 48.2202 32.4163 48.5794 33.1347 48.5794C33.1347 48.5794 33.1347 48.5794 33.2245 48.5794C33.9429 48.5794 34.6612 48.31 35.1102 47.7712L69.4122 13.559C70.4898 12.4814 70.4898 10.7753 69.4122 9.78755C68.3347 8.7998 66.6286 8.71 65.6408 9.78755L33.3143 42.0243L21.6408 29.3631Z"
                  fill="url(#paint0_linear)"
                />
                <path
                  id="circle"
                  d="M68.7837 33.0449C67.2571 33.0449 66.0898 34.2122 66.0898 35.7388C66.0898 52.4408 52.4408 66.0898 35.7388 66.0898C19.0367 66.0898 5.38776 52.4408 5.38776 35.7388C5.38776 19.0367 19.0367 5.38776 35.7388 5.38776C37.2653 5.38776 38.4327 4.22041 38.4327 2.69388C38.4327 1.16735 37.2653 0 35.7388 0C16.0735 0 0 16.0735 0 35.7388C0 55.4041 16.0735 71.4776 35.7388 71.4776C55.4041 71.4776 71.4776 55.4041 71.4776 35.7388C71.4776 34.2122 70.3102 33.0449 68.7837 33.0449Z"
                  fill="url(#paint1_linear)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="43.6111"
                  y1="-4.66959"
                  x2="43.6111"
                  y2="75.8563"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#cf556c" />
                  <stop offset="1" stop-color="#f99185" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="35.7388"
                  y1="-4.66939"
                  x2="35.7388"
                  y2="75.8565"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#cf556c" />
                  <stop offset="1" stop-color="#f99185" />
                </linearGradient>
              </defs>
            </StyledSvg>
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign: "center" }}>
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip1)">
                <path
                  d="M70.8522 55.6002L43.332 7.93377C41.8017 5.28327 39.0608 3.70068 36 3.70068C32.9393 3.70068 30.1982 5.28327 28.6679 7.93377L1.14781 55.6001C-0.382605 58.2508 -0.382605 61.4157 1.14781 64.0664C2.67823 66.717 5.41901 68.2995 8.47985 68.2995H63.5201C66.5808 68.2995 69.3217 66.7169 70.8522 64.0665C72.3827 61.4157 72.3827 58.2508 70.8522 55.6002ZM67.1991 61.9574C66.4311 63.2875 65.0558 64.0814 63.5201 64.0814H8.47985C6.94394 64.0814 5.56863 63.2875 4.80082 61.9574C4.03301 60.6274 4.03301 59.0395 4.80082 57.7094L32.3212 10.043C33.089 8.71297 34.4643 7.919 36.0001 7.919C37.5357 7.919 38.9112 8.71297 39.679 10.043L67.1992 57.7094C67.9669 59.0395 67.9669 60.6274 67.1991 61.9574Z"
                  fill="#cf556c"
                />
                <path
                  d="M38.1088 24.7515H33.8906V45.8427H38.1088V24.7515Z"
                  fill="#cf556c"
                />
                <path
                  d="M36 50.061C34.4493 50.061 33.1877 51.3226 33.1877 52.8733C33.1877 54.4239 34.4493 55.6855 36 55.6855C37.5505 55.6855 38.8122 54.4239 38.8122 52.8733C38.8122 51.3226 37.5506 50.061 36 50.061Z"
                  fill="#cf556c"
                />
              </g>
              <defs>
                <clipPath id="clip1">
                  <rect width="72" height="72" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </>
      )}
      <Typography
        variant="h6"
        style={{ textAlign: "center", marginTop: "1rem" }}
      >
        {message}
      </Typography>
    </>
  );
};

export default SuccessMsg;
