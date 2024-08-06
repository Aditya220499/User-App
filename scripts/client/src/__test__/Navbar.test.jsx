import React from "react";
import App from "../App.jsx";
import { Provider } from "react-redux";
import store from "../store/store.jsx";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, describe, expect } from 'vitest';

it("Checking if correct records after filtering by keyword 'India' are present on list page and moving back to list page after clicking on User button", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  let settings = screen.getByText("Settings");
  expect(settings).toBeInTheDocument();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  let listitems = await screen.findAllByTestId('listitem');
  expect(listitems.length).toBe(2)
  const filter = screen.getByPlaceholderText("Filter");
  fireEvent.change(filter, { target: { value: "India" } });

  await new Promise((r) => setTimeout(r, 4000));

  let listitems1 = await screen.findAllByTestId('listitem');
  expect(listitems1.length).toBe(1)

  const setting = screen.getByTestId("SettingsIcon");
  user.click(setting);

  const PeopleIcon = await screen.findByTestId("PeopleIcon");
  user.click(PeopleIcon);
  await new Promise((r) => setTimeout(r, 1000));

  let listitems2 = await screen.findAllByTestId('listitem');
  expect(listitems2.length).toBe(2)

}, 60000);

it("check Primary language fallback to Secondary language", async () => {
  global.navigator = { languages: ['mr', 'hi'] }
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  expect(screen.getByText("समय अभिलेख")).toBeInTheDocument();
});

it("check Primary language fallback to Default (English) language", async () => {
  global.navigator = { languages: ['mr', 'hi', 'en-US'] }
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  expect(screen.getByText("Time Summary")).toBeInTheDocument();
});

it("check Secondary language fallback to Default (English) language", async () => {
  global.navigator = { languages: ['hi', 'en-US'] }
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  expect(screen.getByText("Last Name")).toBeInTheDocument();
});