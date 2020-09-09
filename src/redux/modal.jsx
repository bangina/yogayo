const MODAL_OPEN = "MODAL_OPEN";
const MODAL_CLOSE = "MODAL_CLOSE";
const MODAL_NEXT = "MODAL_NEXT";
const MODAL_RESULT = "MODAL_RESULT";
const MODAL_DIARY_OPEN = "MODAL_DIARY_OPEN";
const MODAL_DIARY_CLOSE = "MODAL_DIARY_CLOSE";

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
export const closeDiaryModal = () => ({
  type: MODAL_DIARY_CLOSE,
});
export const openDiaryModal = () => ({
  type: MODAL_DIARY_OPEN,
});

const initialState = {
  isModalOpen: false,
  isConfirmOpen: false,
  isResultOpen: false,
  isDiaryModalOpen: false,
};

const modal = (modalState = initialState, action) => {
  switch (action.type) {
    //modal 열기
    case MODAL_OPEN:
      return {
        ...modalState,
        isModalOpen: true,
        isConfirmOpen: false,
        isResultOpen: false,
      };
    //modal 닫기
    case MODAL_CLOSE:
      return { ...modalState, isModalOpen: false, isConfirmOpen: false };
    //modal body 교체(1->2단계)
    case MODAL_NEXT:
      return { ...modalState, isConfirmOpen: true };
    //modal body 교체(2->3단계)
    case MODAL_RESULT:
      return {
        ...modalState,
        isConfirmOpen: false,
        isResultOpen: true,
      };
    case MODAL_DIARY_CLOSE:
      return {
        ...modalState,
        isDiaryModalOpen: false,
      };
    case MODAL_DIARY_OPEN:
      return {
        ...modalState,
        isDiaryModalOpen: true,
      };
    default:
      return modalState;
  }
};
export default modal;
