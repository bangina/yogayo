import { Cookies } from "react-cookie";
const MEMBER_INSERT = "MEMBER_INSERT";
const MEMBER_LOGIN = "MEMBER_LOGIN";

//액션 생성 함수 정의
export const insertMember = (member) => ({
  type: MEMBER_INSERT,
  member,
});
export const login = (email, password) => ({
  type: MEMBER_LOGIN,
  email,
  password,
});

const initialState = {
  members: [
    {
      name: "test1",
      email: "test1@gmail.com",
      password: "test1",
      mobile: "010-1111-1111",
    },
    {
      name: "test2",
      email: "test2@gmail.com",
      password: "test2",
      mobile: "010-2222-2222",
    },
    {
      name: "test3",
      email: "test3@gmail.com",
      password: "test3",
      mobile: "010-3333-3333",
    },
  ],
  loginMember: {},
};

//리듀서 함수 정의
const member = (memberState = initialState, action) => {
  const setSession = (member) => {
    let cookies = new Cookies();
    if (member) cookies.set("member", JSON.stringify(member), { path: "/" });
    else {
      cookies.remove("member");
    }
  };

  switch (action.type) {
    case MEMBER_INSERT:
      return {
        ...memberState,
        members: memberState.members.concat(action.member),
      };
    case MEMBER_LOGIN:
      const loginMember = memberState.members.filter(
        (member) =>
          member.email == action.email && member.password == action.password
      );
      if (loginMember.length === 1) {
        setSession(loginMember[0]);
        return {
          ...memberState,
          loginMember: loginMember,
        };
      } else {
        let cookies = new Cookies();
        cookies.remove("member");
        console.log("로그인 실패");
        return memberState;
      }
    default:
      return memberState;
  }
};

export default member;
