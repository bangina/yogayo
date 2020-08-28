const DATE_CHANGE = "DATE_CHANGE";
const MODAL_OPEN = "MODAL_OPEN";
const MODAL_CLOSE = "MODAL_CLOSE";
const MODAL_NEXT = "MODAL_NEXT";
const SELECT_ENROLL_KLASS = "SELECT_ENROLL_KLASS";

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
export const selectKlass = (selectedKlass) => ({
  type: SELECT_ENROLL_KLASS,
  selectedKlass,
});

const initialState = {
  klasses: [
    {
      id: 1,
      klassDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 10,
    },
    {
      id: 2,
      klassDate: new Date(),
      startTime: "10:00",
      endTime: "11:00",
      place: "간디룸",
      klassName: "아쉬탕가 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 2,
    },
    {
      id: 3,
      klassDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 10,
    },
    {
      id: 4,
      klassDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 5,
    },
    {
      id: 5,
      klassDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 6,
    },
    {
      id: 6,
      klassDate: new Date(),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 2,
    },
    {
      id: 7,
      klassDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 0,
    },
    {
      id: 8,
      klassDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 10,
    },
  ],
  enrolledKlasses: [
    {
      id: 5,
      klassDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 6,
    },
    {
      id: 6,
      klassDate: new Date(),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 2,
    },
    {
      id: 7,
      klassDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 0,
    },
    {
      id: 8,
      klassDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "기초 요가",
      companyName: "자메이카 요가 필라테스 센터",
      maxPeople: 10,
      enrolledPeople: 10,
    },
  ],
  selectedDate: new Date(),
  isModalOpen: true,
  isConfirmOpen: false,
  enrollingKlass: {
    id: 8,
    klassDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
    startTime: "11:00",
    endTime: "10:00",
    place: "간디룸",
    klassName: "기초 요가",
    companyName: "자메이카 요가 필라테스 센터",
    maxPeople: 10,
    enrolledPeople: 10,
  },
};

const klass = (klassState = initialState, action) => {
  switch (action.type) {
    case DATE_CHANGE:
      return { ...klassState, selectedDate: action.clickedDate };
    case MODAL_OPEN:
      return { ...klassState, isModalOpen: true };
    case MODAL_CLOSE:
      return { ...klassState, isModalOpen: false, isConfirmOpen: false };
    case MODAL_NEXT:
      return { ...klassState, isConfirmOpen: true };
    case SELECT_ENROLL_KLASS:
      return { ...klassState, enrollingKlass: action.selectedKlass };
    default:
      return klassState;
  }
};
export default klass;
