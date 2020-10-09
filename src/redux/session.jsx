const DATE_CHANGE = "DATE_CHANGE";
const SELECT_ENROLL_SESSION = "SELECT_ENROLL_SESSION";

export const changeDate = (clickedDate) => ({
  type: DATE_CHANGE,
  clickedDate, //value
});
export const selectSession = (selectedSession) => ({
  type: SELECT_ENROLL_SESSION,
  selectedSession,
});

const initialState = {
  sessions: [
    {
      id: "",
      username: "",
      name: "",
      room: "",
      date: "",
      time: "",
      max_ppl: null,
    },
  ],
  enrolledSessions: [
    {
      id: "",
      username: "",
      name: "",
      room: "",
      date: "",
      time: "",
      max_ppl: null,
    },
  ],
  enrollingSession: {
    id: "",
    username: "",
    name: "",
    room: "",
    date: "",
    time: "",
    max_ppl: null,
  },
  selectedDate: new Date(),
};

const session = (sessionState = initialState, action) => {
  switch (action.type) {
    case DATE_CHANGE:
      return { ...sessionState, selectedDate: action.clickedDate };
    case SELECT_ENROLL_SESSION:
      return { ...sessionState, enrollingSession: action.selectedSession };
    default:
      return sessionState;
  }
};
export default session;
