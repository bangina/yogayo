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
      klassName: "기초 요가",
    },
    {
      id: 7,
      klassDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "기초 요가",
    },
    {
      id: 8,
      klassDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      startTime: "11:00",
      endTime: "10:00",
      place: "간디룸",
      klassName: "기초 요가",
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
