const INSERT_POST = "INSERT_POST";

export const insert = (post) => ({
  type: INSERT_POST,
  post,
});

const initialState = [
  {
    id: 1,
    header: "기타",
    title: "제목 입니다",
    contents: "내용입니다내용내용",
    writer: "test1",
    regiDate: "2020.8.31",
  },
  {
    id: 2,
    header: "기타",
    title: "제목 입니다",
    contents: "내용입니다",
    writer: "test1",
    regiDate: "2020.8.31",
  },
];

const posts = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_POST:
      return [...state, action.post];
    default:
      return state;
  }
};
export default posts;
