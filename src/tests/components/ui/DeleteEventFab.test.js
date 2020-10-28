import React from "react";

import "@testing-library/jest-dom";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { eventStartDelete } from "../../../actions/events";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

const store = mockStore(initState);

store.dispatch = jest.fn();

jest.mock("../../../actions/events", () => ({
  eventStartDelete: jest.fn(),
}));
let token = "";

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe("Pruebas en <DeleteEventFab />", () => {
  test("debe mostrarseccorrectamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("debe de llamar el eventStartDelete al hacer click", () => {
    wrapper.find("button").prop("onClick")();
    expect(eventStartDelete).toHaveBeenCalled();
  });
});
