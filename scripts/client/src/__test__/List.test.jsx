import React from "react";
import App from "../App.jsx";
import { Provider } from "react-redux";
import store from "../store/store.jsx";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { debug } from "jest-preview";
import { it, expect } from 'vitest';

it("Checking if all the records present in handler are present on list page", async () => {
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
}, 60000);

it(" Checking if correct records after filtering by keyword 'India' are present on list page", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  debug()
  let settings = screen.getByText("Settings");
  expect(settings).toBeInTheDocument();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  await waitFor(() => userEvent.click(screen.getByText("Action")));
  let listitems = await screen.findAllByTestId('listitem');
  expect(listitems.length).toBe(2)
  const filter = screen.getByPlaceholderText("Filter");
  fireEvent.change(filter, { target: { value: "India" } });
  await new Promise((r) => setTimeout(r, 3500));
  let listitems1 = await screen.findAllByTestId('listitem');
  expect(listitems1.length).toBe(1)
}, 60000);

it("Checking for 'no records to display' message after filtering by keyword 'Germany' on list page", async () => {
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
  await waitFor(() => userEvent.click(screen.getByText("Action")))
  const filter = screen.getByPlaceholderText("Filter");
  fireEvent.change(filter, { target: { value: "India" } });
  await new Promise((r) => setTimeout(r, 3500));
  let listitems = await screen.findAllByTestId('listitem');
  expect(listitems.length).toBe(1)
  fireEvent.change(filter, { target: { value: "Germany" } });
  await new Promise((r) => setTimeout(r, 3500));
  await waitFor(() => expect(screen.getByTestId("MessageIO").textContent).toBe("No Records to display"));
}, 60000);

it("list view shows in primary language", async () => {
  global.navigator = { languages: ['mr'] }
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  let Action = screen.getByTestId("Action");
  expect(Action).toBeInTheDocument;
  expect(screen.getByText("घड्याळाची वेळ")).toBeInTheDocument();
});

it("list view shows in Secondary language", async () => {
  global.navigator = { languages: ['hi'] }
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  let Action = screen.getByTestId("Action");
  expect(Action).toBeInTheDocument;
  expect(screen.getByText("घड़ी का समय")).toBeInTheDocument();
});