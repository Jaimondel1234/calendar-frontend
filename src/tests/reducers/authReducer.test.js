import "@testing-library/jest-dom";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";
import { startLogin } from "../../actions/auth";

const initState = {
  checking: true,
};

describe("Pruebas de auth Reducer", () => {
  test("debe de retonar el estado por defecto ", () => {
    const state = authReducer(initState, {});
    expect(state).toEqual(initState);
  });
  test("debe de autenticar al usuario", () => {
    const actionLogin = {
      type: types.authLogin,
      payload: { name: "Fer", _id: "232344" },
    };
    const stateLogin = authReducer(initState, actionLogin);
    expect(stateLogin).toEqual({ checking: false, name: "Fer", _id: "232344" });
  });
});
