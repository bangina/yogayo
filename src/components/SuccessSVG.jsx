import React from 'react';
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

const SuccessSVG = () => {
    return (
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
    );
};

export default SuccessSVG;