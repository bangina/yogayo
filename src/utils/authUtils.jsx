import { Cookies} from "react-cookie";

//사용자 브라우저 쿠키에선 인증토큰 조회 반환 재사용 함수
const getUserToken = () => {
  const cookies = new Cookies();
  const userToken = cookies.get("usertoken");
  return userToken;
};
//쿠키에 저장된 인증토큰 지우기!
const setCookieExpire = () => {
  const cookies = new Cookies();
  cookies.remove("usertoken");
};
//사용자 인증여부(토큰보유 여부)
const isUserAuthenticated = () => {
  const userToken = getUserToken();
  if (userToken == null) {
    //인증이 안된 상태
    return false;
  } else {
    //인증완료 상태
    return true;
  }
};
const notLoginRedirect = () => {
  const userToken = getUserToken();

  if (!isUserAuthenticated()) {
    window.location = "/login";
  }
};

export { getUserToken, isUserAuthenticated, setCookieExpire, notLoginRedirect };
