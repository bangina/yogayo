const DATE_CHANGE = "DATE_CHANGE";

export const changeDate = (clickedDate) => ({
  type: DATE_CHANGE,
  clickedDate,
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
    },
    {
      id: 2,
      klassDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
    },
    {
      id: 3,
      klassDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
    },
    {
      id: 4,
      klassDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
    },
    {
      id: 5,
      klassDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "빈야사 요가",
    },
    {
      id: 6,
      klassDate: new Date(),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "기촌초 요가",
    },
  ],
  selectedDate: new Date(),
};

const klassReducer = (klassState = initialState, action) => {
  switch (action.type) {
    case DATE_CHANGE:
      return { ...klassState, selectedDate: action.clickedDate };
    default:
      return klassState;
  }
};
export default klassReducer;
