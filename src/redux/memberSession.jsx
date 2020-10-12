const initialState = {
  memberSessions: [
    { name: "test1", bookedLessons: [1, 2, 3, 4, 5] },
    { name: "test2", bookedLessons: [3] },
    { name: "test3", bookedLessons: [1] },
    { name: "test4", bookedLessons: [1, 5] },
    { name: "test5", bookedLessons: [6, 7] },
    { name: "test6", bookedLessons: [] },
  ],
};

const memberSession = (memberSessionState = initialState, action) => {
  switch (action.type) {
    default:
      return memberSessionState;
  }
};
export default memberSession;
