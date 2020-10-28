import React from "react";

import "@testing-library/jest-dom";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-messages";
import { types } from "../../../types/types";
import { eventSetActive } from "../../../actions/events";
import { act } from "react-dom/test-utils";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  calendar: {
    events: [],
    activeEvent: null,
  },
  auth: {
    uid: 23443,
  },
  ui: {
    modalOpen: false,
  },
};

const store = mockStore(initState);

store.dispatch = jest.fn();

jest.mock("../../../actions/events", () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("Pruebas en <CalendarScreen/>", () => {
  test("Se debe mostrar correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Pruebas con las interacciones del calendario", () => {
    const calendar = wrapper.find("Calendar");

    const calendarMessages = calendar.prop("messages");
    expect(calendarMessages).toEqual(messages);

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

    calendar.prop("onSelectEvent")({
      start: "Hola",
    });
    expect(eventSetActive).toHaveBeenCalledWith({ start: "Hola" });
    act(() => {
      calendar.prop("onView")("week");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    });
  });
});
