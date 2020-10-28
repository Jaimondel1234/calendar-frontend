import React from "react";

import "@testing-library/jest-dom";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { AppRouter } from "../../router/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Pruebas en <AppRouter/>", () => {
  test("debe mostrarse correctamente", () => {
    const initState = {
      auth: {
        checking: true,
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h5").exists()).toBe(true);
  });

  test("debe de mostrar la ruta pública", () => {
    const initState = {
      auth: {
        checking: false,
        uid: null,
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("debe de mostrar la ruta privada", () => {
    const initState = {
      ui: {
        modalOpen: false,
      },
      auth: {
        checking: false,
        uid: "123",
        name: "Juan Carlos",
      },
      calendar: {
        events: [],
        activeEvent: null,
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
