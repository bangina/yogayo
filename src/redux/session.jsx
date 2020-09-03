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
      id: 1,
      sessionDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "빈야사 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: ["test2"],
    },
    {
      id: 2,
      sessionDate: new Date(),
      startTime: "10:00",
      endTime: "11:00",
      place: "간디룸",
      sessionName: "아쉬탕가 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: ["test1", "test2"],
    },
    {
      id: 3,
      sessionDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "빈야사 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: ["test1", "test2"],
    },
    {
      id: 4,
      sessionDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "빈야사 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: ["test2"],
    },
    {
      id: 5,
      sessionDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "빈야사 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: ["test1"],
    },
    {
      id: 6,
      sessionDate: new Date(),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: [],
    },
    {
      id: 7,
      sessionDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: ["test1", "test2"],
    },
    {
      id: 8,
      sessionDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: [],
    },
  ],
  enrolledSessions: [
    {
      id: 5,
      sessionDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "빈야사 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: ["test2"],
    },
    {
      id: 6,
      sessionDate: new Date(),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: ["test1", "test2"],
    },
    {
      id: 7,
      sessionDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: ["test1", "test2"],
    },
    {
      id: 8,
      sessionDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      sessionName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: ["test1", "test2", "test3"],
    },
  ],
  enrollingSession: {
    id: 8,
    sessionDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
    startTime: "11:00",
    endTime: "10:00",
    place: "간디룸",
    sessionName: "기초 요가",
    companyName: "자메이카 요가 필라테스 센터",
    maxPeople: 10,
    enrolledPeople: ["test1"],
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
