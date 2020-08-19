const DATE_CHANGE = "DATE_CHANGE";

export const changeDate = (clickedDate) => ({
  type: DATE_CHANGE,
  clickedDate, //value
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
      enrolledPeople: 3,
    },
    {
      id: 2,
      klassDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
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
      enrolledPeople: 4,
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
};

const klass = (klassState = initialState, action) => {
  switch (action.type) {
    case DATE_CHANGE:
      return { ...klassState, selectedDate: action.clickedDate };
    default:
      return klassState;
  }
};
export default klass;
