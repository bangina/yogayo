const initialState = {
  memberSessions: [
    { name: "test1", enrolledSessions: [1, 2, 3, 4, 5] },
    { name: "test2", enrolledSessions: [3] },
    { name: "test3", enrolledSessions: [1] },
    { name: "test4", enrolledSessions: [1, 5] },
    { name: "test5", enrolledSessions: [6, 7] },
    { name: "test6", enrolledSessions: [] },
  ],
};

const memberSession = (memberSessionState = initialState, action) => {
  switch (action.type) {
    default:
      return memberSessionState;
  }
};
export default memberSession;
