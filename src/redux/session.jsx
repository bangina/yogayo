const DATE_CHANGE = "DATE_CHANGE";
const MODAL_OPEN = "MODAL_OPEN";
const MODAL_CLOSE = "MODAL_CLOSE";
const MODAL_NEXT = "MODAL_NEXT";
const MODAL_RESULT = "MODAL_RESULT";
const SELECT_ENROLL_SESSION = "SELECT_ENROLL_SESSION";

export const changeDate = (clickedDate) => ({
  type: DATE_CHANGE,
  clickedDate, //value
});
export const openModal = () => ({
  type: MODAL_OPEN,
});
export const closeModal = () => ({
  type: MODAL_CLOSE,
});
export const nextModal = () => ({
  type: MODAL_NEXT,
});
export const showResult = () => ({
  type: MODAL_RESULT,
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
      enrolledPeople: 10,
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
      enrolledPeople: 2,
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
      enrolledPeople: 10,
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
      enrolledPeople: 5,
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
      enrolledPeople: 6,
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
      enrolledPeople: 2,
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
      enrolledPeople: 0,
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
      enrolledPeople: 10,
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
      enrolledPeople: 6,
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
      enrolledPeople: 2,
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
      enrolledPeople: 0,
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
      enrolledPeople: 10,
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
    enrolledPeople: 10,
  },
  selectedDate: new Date(),
  isModalOpen: false,
  isConfirmOpen: false,
  isResultOpen: false,
};

const session = (sessionState = initialState, action) => {
  switch (action.type) {
    case DATE_CHANGE:
      return { ...sessionState, selectedDate: action.clickedDate };
    //modal 열기
    case MODAL_OPEN:
      return {
        ...sessionState,
        isModalOpen: true,
        isConfirmOpen: false,
        isResultOpen: false,
      };
    //modal 닫기
    case MODAL_CLOSE:
      return { ...sessionState, isModalOpen: false, isConfirmOpen: false };
    //modal body 교체(1->2단계)
    case MODAL_NEXT:
      return { ...sessionState, isConfirmOpen: true };
    //modal body 교체(2->3단계)
    case MODAL_RESULT:
      return {
        ...sessionState,
        isConfirmOpen: false,
        isResultOpen: true,
      };
    case SELECT_ENROLL_SESSION:
      return { ...sessionState, enrollingSession: action.selectedSession };
    default:
      return sessionState;
  }
};
export default session;
