const DATE_CHANGE = "DATE_CHANGE";
const SELECT_BOOK_SESSION = "SELECT_BOOK_SESSION";

export const changeDate = (clickedDate) => ({
  type: DATE_CHANGE,
  clickedDate, //value
});
export const selectSession = (selectedSession) => ({
  type: SELECT_BOOK_SESSION,
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
  bookedLessons: [
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
  bookingLesson: {
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
    case SELECT_BOOK_SESSION:
      return { ...sessionState, bookingLesson: action.selectedSession };
    default:
      return sessionState;
  }
};
export default session;
