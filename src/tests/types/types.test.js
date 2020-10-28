import { types } from "../../types/types";

describe("Pruebas en Types", () => {
  test("los types deben de ser iguales", () => {
    expect(types).toEqual({
      uiOpenModal: "[ui] Open Modal",
      uiCloseModal: "[ui] Close Modal",

      eventStartAddNew: "[event] Start add new",
      eventSetActive: "[event] Set Active",
      eventLogout: "[event] Logout",
      eventAddNew: "[event] Add new",
      eventClearActiveEvent: "[event] Clear active event",
      eventUpdated: "[event] Event updated",
      eventDeleted: "[event] Event deleted",
      eventLoaded: "[event] Events loaded",

      authCheckingFinish: "[auth] Finish checking login state",
      authStartLogin: "[auth] Start login",
      authLogin: "[auth] login",
      authStartRegister: "[auth] Start Register",
      authStartTokenRenew: "[auth] Start Token renew",
      authLogout: "[auth] Logout",
    });
  });
});
