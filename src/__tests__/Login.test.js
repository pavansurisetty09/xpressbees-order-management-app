import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "../components/Login/Login";
import { authenticateUser, errorMessage } from "../../actions/AuthAction";

const mockStore = configureStore([]);

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authentication: {
        isUserAuthenticated: false,
        err: "",
      },
    });
  });

  test("renders login form", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });

  test("displays error message for invalid credentials", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "invalid" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("LOGIN"));

    expect(
      screen.getByText("Invalid username or password.")
    ).toBeInTheDocument();
  });

  test("dispatches authenticateUser action for valid credentials", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "valid" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("LOGIN"));

    const expectedActions = [
      authenticateUser({ username: "valid", password: "password" }),
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("clears error message when values change", () => {
    store = mockStore({
      authentication: {
        isUserAuthenticated: false,
        err: "Invalid username or password.",
      },
    });

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "valid" },
    });

    expect(store.getActions()).toContainEqual(errorMessage(""));
  });
});
