import "@testing-library/jest-dom";
import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";
import { uiOpenModal, uiCloseModal } from "../../actions/ui";

const initState = {
  modalOpen: false,
};

describe("Pruebas de uiReducer", () => {
  test("debe de retornar el estado por defecto ", () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });
  test("debe de abrir y cerrar el modal", () => {
    const modalOpen = uiOpenModal();
    const stateOpen = uiReducer(initState, modalOpen);
    expect(stateOpen).toEqual({ modalOpen: true });

    const modalClose = uiCloseModal();
    const stateClose = uiReducer(initState, modalClose);
    expect(stateClose).toEqual({ modalOpen: false });
  });
});
