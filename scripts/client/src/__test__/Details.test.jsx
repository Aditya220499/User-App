import React from "react";
import App from "../App.jsx";
import { Provider } from "react-redux";
import store from "../store/store.jsx";
import { render, screen, waitFor, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect } from 'vitest';

it("Click on the action button, fill in the details and then check for the message `User Record Created Successfully` after clicking the Save button.", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  await waitFor(() => expect(screen.getByTestId("Save")).toBeInTheDocument());

  const employeeID = screen.getByPlaceholderText("Employee ID");
  fireEvent.change(employeeID, { target: { value: "ahales" } });

  const firstName = screen.getByPlaceholderText("First Name");
  fireEvent.change(firstName, { target: { value: "Alex" } });

  const lastName = screen.getByPlaceholderText("Last Name");
  fireEvent.change(lastName, { target: { value: "Hales" } });

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "ahales@gmail.com" } });

  const phone = screen.getByPlaceholderText("Phone");
  fireEvent.change(phone, { target: { value: "+91 99965 45656" } });

  const organizationCode = screen.getByTestId("organizationCode");
  const input1 = within(organizationCode).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input1, { target: { value: "R3 Services" } });
  fireEvent.keyDown(organizationCode, { key: "ArrowDown" });
  fireEvent.keyDown(organizationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "Enter" }));

  const role = screen.getByTestId("role");
  const input2 = within(role).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input2, { target: { value: "Manager" } });
  fireEvent.keyDown(role, { key: "ArrowDown" });
  fireEvent.keyDown(role, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(role, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(role, { key: "Enter" }));

  const countryCode = screen.getByTestId("countryCode");
  const input3 = within(countryCode).getByRole("combobox");
  countryCode.focus();
  fireEvent.change(input3, { target: { value: "United States of America" } });
  fireEvent.keyDown(countryCode, { key: "ArrowDown" });
  fireEvent.keyDown(countryCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "Enter" }));

  const locationCode = screen.getByTestId("locationCode");
  const input4 = within(locationCode).getByRole("combobox");
  locationCode.focus();
  fireEvent.change(input4, { target: { value: "Bettendorf, USA" } });
  fireEvent.keyDown(locationCode, { key: "ArrowDown" });
  fireEvent.keyDown(locationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "Enter" }));

  const locale = screen.getByTestId("locale");
  const input5 = within(locale).getByRole("combobox");
  locale.focus();
  fireEvent.change(input5, { target: { value: "US English" } });
  fireEvent.keyDown(locale, { key: "ArrowDown" });
  fireEvent.keyDown(locale, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locale, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locale, { key: "Enter" }));

  const timeZone = screen.getByTestId("timeZone");
  const input6 = within(timeZone).getByRole("combobox");
  timeZone.focus();
  fireEvent.change(input6, { target: { value: "IST" } });
  fireEvent.keyDown(timeZone, { key: "ArrowDown" });
  fireEvent.keyDown(timeZone, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "Enter" }));

  const CIDRS = screen.getByPlaceholderText("Allowed CIDR");
  fireEvent.change(CIDRS, { target: { value: "0" } });

  const status = screen.getByTestId("status");
  const input7 = within(status).getByRole("combobox");
  status.focus();
  fireEvent.change(input7, { target: { value: "Active" } });
  fireEvent.keyDown(status, { key: "ArrowDown" });
  fireEvent.keyDown(status, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(status, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(status, { key: "Enter" }));

  const startDate = screen.getByPlaceholderText("Start Date");
  await user.type(startDate, "2022-01-02");

  const endDate = screen.getByPlaceholderText("End Date");
  fireEvent.change(endDate, { target: { value: "2023-01-02" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "password" } });

  const reEnterPassword = screen.getByPlaceholderText("Re-enter Password");
  fireEvent.change(reEnterPassword, { target: { value: "password" } });

  const Save = screen.getByTestId("Save");
  fireEvent.click(Save)
  const successResponse = await screen.findByText('User Record Created Successfully')
  expect(successResponse).toBeInTheDocument()
}, 25000);

it("Click the action button and verify if all fields are present and then submit the form without filling and check for the Yup error", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  expect(await screen.findByTestId("Save")).toBeInTheDocument();
  const Save = screen.getByTestId("Save");
  fireEvent.click(Save);
  const messages = await screen.findAllByText(/Required/i)
  expect(messages.length).toBe(14)
}, 30000);

it("Change the data in order to create a duplicate record and verify the 'Duplicate Record found'", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  await waitFor(() => expect(screen.getByTestId("Save")).toBeInTheDocument());

  const employeeID = screen.getByPlaceholderText("Employee ID");
  fireEvent.change(employeeID, { target: { value: "jcook" } });

  const firstName = screen.getByPlaceholderText("First Name");
  fireEvent.change(firstName, { target: { value: "Joe" } });

  const lastName = screen.getByPlaceholderText("Last Name");
  fireEvent.change(lastName, { target: { value: "Cook" } });

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "jcook@gmail.com" } });

  const phone = screen.getByPlaceholderText("Phone");
  fireEvent.change(phone, { target: { value: "+91 99965 75656" } });

  const organizationCode = screen.getByTestId("organizationCode");
  const input1 = within(organizationCode).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input1, { target: { value: "R3 Services" } });
  fireEvent.keyDown(organizationCode, { key: "ArrowDown" });
  fireEvent.keyDown(organizationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "Enter" }));

  const role = screen.getByTestId("role");
  const input2 = within(role).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input2, { target: { value: "Manager" } });
  fireEvent.keyDown(role, { key: "ArrowDown" });
  fireEvent.keyDown(role, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(role, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(role, { key: "Enter" }));

  const countryCode = screen.getByTestId("countryCode");
  const input3 = within(countryCode).getByRole("combobox");
  countryCode.focus();
  fireEvent.change(input3, { target: { value: "United States of America" } });
  fireEvent.keyDown(countryCode, { key: "ArrowDown" });
  fireEvent.keyDown(countryCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "Enter" }));

  const locationCode = screen.getByTestId("locationCode");
  const input4 = within(locationCode).getByRole("combobox");
  locationCode.focus();
  fireEvent.change(input4, { target: { value: "Bettendorf, USA" } });
  fireEvent.keyDown(locationCode, { key: "ArrowDown" });
  fireEvent.keyDown(locationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "Enter" }));

  const locale = screen.getByTestId("locale");
  const input5 = within(locale).getByRole("combobox");
  locale.focus();
  fireEvent.change(input5, { target: { value: "US English" } });
  fireEvent.keyDown(locale, { key: "ArrowDown" });
  fireEvent.keyDown(locale, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locale, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locale, { key: "Enter" }));

  const timeZone = screen.getByTestId("timeZone");
  const input6 = within(timeZone).getByRole("combobox");
  timeZone.focus();
  fireEvent.change(input6, { target: { value: "IST" } });
  fireEvent.keyDown(timeZone, { key: "ArrowDown" });
  fireEvent.keyDown(timeZone, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "Enter" }));

  const CIDRS = screen.getByPlaceholderText("Allowed CIDR");
  fireEvent.change(CIDRS, { target: { value: "0" } });

  const status = screen.getByTestId("status");
  const input7 = within(status).getByRole("combobox");
  status.focus();
  fireEvent.change(input7, { target: { value: "Active" } });
  fireEvent.keyDown(status, { key: "ArrowDown" });
  fireEvent.keyDown(status, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(status, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(status, { key: "Enter" }));

  const startDate = screen.getByPlaceholderText("Start Date");
  await userEvent.type(startDate, "2022-01-02");

  const endDate = screen.getByPlaceholderText("End Date");
  fireEvent.change(endDate, { target: { value: "2023-01-02" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "password" } });

  const reEnterPassword = screen.getByPlaceholderText("Re-enter Password");
  fireEvent.change(reEnterPassword, { target: { value: "password" } });

  const Save = screen.getByTestId("Save");
  fireEvent.click(Save)

  const successResponse = await screen.findByText('Duplicate Record Found')
  expect(successResponse).toBeInTheDocument()

}, 60000);

it("Click the action button and create a record with invalid email ID and enter the start date after the end date and check for the Yup error messages", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  await waitFor(() => expect(screen.getByTestId("Save")).toBeInTheDocument());

  const employeeID = screen.getByPlaceholderText("Employee ID");
  fireEvent.change(employeeID, { target: { value: "ahales" } });

  const firstName = screen.getByPlaceholderText("First Name");
  fireEvent.change(firstName, { target: { value: "Alex" } });

  const lastName = screen.getByPlaceholderText("Last Name");
  fireEvent.change(lastName, { target: { value: "Hales" } });

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "ahales" } });

  const phone = screen.getByPlaceholderText("Phone");
  fireEvent.change(phone, { target: { value: "+91 99965 45656" } });

  const organizationCode = screen.getByTestId("organizationCode");
  const input1 = within(organizationCode).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input1, { target: { value: "R3 Services" } });
  fireEvent.keyDown(organizationCode, { key: "ArrowDown" });
  fireEvent.keyDown(organizationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "Enter" }));

  const role = screen.getByTestId("role");
  const input2 = within(role).getByRole("combobox");
  role.focus();
  fireEvent.change(input2, { target: { value: "Manager" } });
  fireEvent.keyDown(role, { key: "ArrowDown" });
  fireEvent.keyDown(role, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(role, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(role, { key: "Enter" }));

  const countryCode = screen.getByTestId("countryCode");
  const input3 = within(countryCode).getByRole("combobox");
  countryCode.focus();
  fireEvent.change(input3, { target: { value: "United States of America" } });
  fireEvent.keyDown(countryCode, { key: "ArrowDown" });
  fireEvent.keyDown(countryCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "Enter" }));

  const locationCode = screen.getByTestId("locationCode");
  const input4 = within(locationCode).getByRole("combobox");
  locationCode.focus();
  fireEvent.change(input4, { target: { value: "Bettendorf, USA" } });
  fireEvent.keyDown(locationCode, { key: "ArrowDown" });
  fireEvent.keyDown(locationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "Enter" }));

  const locale = screen.getByTestId("locale");
  const input5 = within(locale).getByRole("combobox");
  locale.focus();
  fireEvent.change(input5, { target: { value: "US English" } });
  fireEvent.keyDown(locale, { key: "ArrowDown" });
  fireEvent.keyDown(locale, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locale, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locale, { key: "Enter" }));

  const timeZone = screen.getByTestId("timeZone");
  const input6 = within(timeZone).getByRole("combobox");
  timeZone.focus();
  fireEvent.change(input6, { target: { value: "IST" } });
  fireEvent.keyDown(timeZone, { key: "ArrowDown" });
  fireEvent.keyDown(timeZone, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "Enter" }));

  const CIDRS = screen.getByPlaceholderText("Allowed CIDR");
  fireEvent.change(CIDRS, { target: { value: "0" } });

  const status = screen.getByTestId("status");
  const input7 = within(status).getByRole("combobox");
  status.focus();
  fireEvent.change(input7, { target: { value: "Active" } });
  fireEvent.keyDown(status, { key: "ArrowDown" });
  fireEvent.keyDown(status, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(status, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(status, { key: "Enter" }));

  const startDate = screen.getByPlaceholderText("Start Date");
  await user.type(startDate, "2022-01-02");

  const endDate = screen.getByPlaceholderText("End Date");
  fireEvent.change(endDate, { target: { value: "2023-01-02" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "password" } });

  const reEnterPassword = screen.getByPlaceholderText("Re-enter Password");
  fireEvent.change(reEnterPassword, { target: { value: "password" } });

  const Save = screen.getByTestId("Save");
  await user.click(Save);
  const successResponse = await screen.findByText('email must be a valid email')
  expect(successResponse).toBeInTheDocument()

  fireEvent.change(employeeID, { target: { value: "ahales" } });
  fireEvent.change(firstName, { target: { value: "Alex" } });
  fireEvent.change(lastName, { target: { value: "Hales" } });
  fireEvent.change(email, { target: { value: "ahales@gmail.com" } });
  fireEvent.change(phone, { target: { value: "+91 99965 45656" } });
  organizationCode.focus();
  fireEvent.change(input1, { target: { value: "R3 Services" } });
  fireEvent.keyDown(organizationCode, { key: "ArrowDown" });
  fireEvent.keyDown(organizationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "Enter" }));
  role.focus();
  fireEvent.change(input2, { target: { value: "Manager" } });
  fireEvent.keyDown(role, { key: "ArrowDown" });
  fireEvent.keyDown(role, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(role, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(role, { key: "Enter" }));
  await user.type(endDate, "2020-01-02");
  countryCode.focus();
  fireEvent.change(input3, { target: { value: "United States of America" } });
  fireEvent.keyDown(countryCode, { key: "ArrowDown" });
  fireEvent.keyDown(countryCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "Enter" }));
  locationCode.focus();
  fireEvent.change(input4, { target: { value: "Bettendorf, USA" } });
  fireEvent.keyDown(locationCode, { key: "ArrowDown" });
  fireEvent.keyDown(locationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "Enter" }));
  locale.focus();
  fireEvent.change(input5, { target: { value: "US English" } });
  fireEvent.keyDown(locale, { key: "ArrowDown" });
  fireEvent.keyDown(locale, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locale, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locale, { key: "Enter" }));
  timeZone.focus();
  fireEvent.change(input6, { target: { value: "IST" } });
  fireEvent.keyDown(timeZone, { key: "ArrowDown" });
  fireEvent.keyDown(timeZone, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "Enter" }));
  fireEvent.change(CIDRS, { target: { value: "0" } });
  status.focus();
  fireEvent.change(input7, { target: { value: "Active" } });
  fireEvent.keyDown(status, { key: "ArrowDown" });
  fireEvent.keyDown(status, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(status, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(status, { key: "Enter" }));
  await user.type(startDate, "2022-01-02");
  fireEvent.change(endDate, { target: { value: "2020-01-02" } });
  fireEvent.change(password, { target: { value: "password" } });
  fireEvent.change(reEnterPassword, { target: { value: "password" } });

  fireEvent.click(Save)

  const response = await screen.findByText('Start Date must be before End Date')
  expect(response).toBeInTheDocument()
}, 30000);

it("Click the action button and create a record and click on Save without making any changes and check for the message `No Changes to Update` and then change the employee ID and check for the message `Record Updated successfully`", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  await waitFor(() => expect(screen.getByTestId("Save")).toBeInTheDocument());

  const employeeID = screen.getByPlaceholderText("Employee ID");
  fireEvent.change(employeeID, { target: { value: "ahales" } });

  const firstName = screen.getByPlaceholderText("First Name");
  fireEvent.change(firstName, { target: { value: "Alex" } });

  const lastName = screen.getByPlaceholderText("Last Name");
  fireEvent.change(lastName, { target: { value: "Hales" } });

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "ahales@gmail.com" } });

  const phone = screen.getByPlaceholderText("Phone");
  fireEvent.change(phone, { target: { value: "+91 99965 45656" } });

  const organizationCode = screen.getByTestId("organizationCode");
  const input1 = within(organizationCode).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input1, { target: { value: "R3 Services" } });
  fireEvent.keyDown(organizationCode, { key: "ArrowDown" });
  fireEvent.keyDown(organizationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "Enter" }));

  const role = screen.getByTestId("role");
  const input2 = within(role).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input2, { target: { value: "Manager" } });
  fireEvent.keyDown(role, { key: "ArrowDown" });
  fireEvent.keyDown(role, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(role, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(role, { key: "Enter" }));

  const countryCode = screen.getByTestId("countryCode");
  const input3 = within(countryCode).getByRole("combobox");
  countryCode.focus();
  fireEvent.change(input3, { target: { value: "United States of America" } });
  fireEvent.keyDown(countryCode, { key: "ArrowDown" });
  fireEvent.keyDown(countryCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "Enter" }));

  const locationCode = screen.getByTestId("locationCode");
  const input4 = within(locationCode).getByRole("combobox");
  locationCode.focus();
  fireEvent.change(input4, { target: { value: "Bettendorf, USA" } });
  fireEvent.keyDown(locationCode, { key: "ArrowDown" });
  fireEvent.keyDown(locationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "Enter" }));

  const locale = screen.getByTestId("locale");
  const input5 = within(locale).getByRole("combobox");
  locale.focus();
  fireEvent.change(input5, { target: { value: "US English" } });
  fireEvent.keyDown(locale, { key: "ArrowDown" });
  fireEvent.keyDown(locale, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locale, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locale, { key: "Enter" }));

  const timeZone = screen.getByTestId("timeZone");
  const input6 = within(timeZone).getByRole("combobox");
  timeZone.focus();
  fireEvent.change(input6, { target: { value: "IST" } });
  fireEvent.keyDown(timeZone, { key: "ArrowDown" });
  fireEvent.keyDown(timeZone, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "Enter" }));

  const CIDRS = screen.getByPlaceholderText("Allowed CIDR");
  fireEvent.change(CIDRS, { target: { value: "0" } });

  const status = screen.getByTestId("status");
  const input7 = within(status).getByRole("combobox");
  status.focus();
  fireEvent.change(input7, { target: { value: "Active" } });
  fireEvent.keyDown(status, { key: "ArrowDown" });
  fireEvent.keyDown(status, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(status, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(status, { key: "Enter" }));

  const startDate = screen.getByPlaceholderText("Start Date");
  await user.type(startDate, "2022-01-02");

  const endDate = screen.getByPlaceholderText("End Date");
  fireEvent.change(endDate, { target: { value: "2023-01-02" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "password" } });

  const reEnterPassword = screen.getByPlaceholderText("Re-enter Password");
  fireEvent.change(reEnterPassword, { target: { value: "password" } });

  const Save = screen.getByTestId("Save");
  fireEvent.click(Save)
  const successResponse = await screen.findByText('User Record Created Successfully')
  expect(successResponse).toBeInTheDocument()
  fireEvent.click(Save)
  const response = await screen.findByText('No Changes to Update')
  expect(response).toBeInTheDocument()
  fireEvent.change(employeeID, { target: { value: "alexhales" } });

  fireEvent.click(Save)
  const response1 = await screen.findByText('Record Updated successfully')
  expect(response1).toBeInTheDocument()

}, 30000);

it(" Click the action button and create a record and click on Change Password button, change password and re-enter password fields and check for the message 'Password Updated successfully' ", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  await waitFor(() => expect(screen.getByTestId("Save")).toBeInTheDocument());

  const employeeID = screen.getByPlaceholderText("Employee ID");
  fireEvent.change(employeeID, { target: { value: "ahales" } });

  const firstName = screen.getByPlaceholderText("First Name");
  fireEvent.change(firstName, { target: { value: "Alex" } });

  const lastName = screen.getByPlaceholderText("Last Name");
  fireEvent.change(lastName, { target: { value: "Hales" } });

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "ahales@gmail.com" } });

  const phone = screen.getByPlaceholderText("Phone");
  fireEvent.change(phone, { target: { value: "+91 99965 45656" } });

  const organizationCode = screen.getByTestId("organizationCode");
  const input1 = within(organizationCode).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input1, { target: { value: "R3 Services" } });
  fireEvent.keyDown(organizationCode, { key: "ArrowDown" });
  fireEvent.keyDown(organizationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "Enter" }));

  const role = screen.getByTestId("role");
  const input2 = within(role).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input2, { target: { value: "Manager" } });
  fireEvent.keyDown(role, { key: "ArrowDown" });
  fireEvent.keyDown(role, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(role, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(role, { key: "Enter" }));

  const countryCode = screen.getByTestId("countryCode");
  const input3 = within(countryCode).getByRole("combobox");
  countryCode.focus();
  fireEvent.change(input3, { target: { value: "United States of America" } });
  fireEvent.keyDown(countryCode, { key: "ArrowDown" });
  fireEvent.keyDown(countryCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "Enter" }));

  const locationCode = screen.getByTestId("locationCode");
  const input4 = within(locationCode).getByRole("combobox");
  locationCode.focus();
  fireEvent.change(input4, { target: { value: "Bettendorf, USA" } });
  fireEvent.keyDown(locationCode, { key: "ArrowDown" });
  fireEvent.keyDown(locationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "Enter" }));

  const locale = screen.getByTestId("locale");
  const input5 = within(locale).getByRole("combobox");
  locale.focus();
  fireEvent.change(input5, { target: { value: "US English" } });
  fireEvent.keyDown(locale, { key: "ArrowDown" });
  fireEvent.keyDown(locale, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locale, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locale, { key: "Enter" }));

  const timeZone = screen.getByTestId("timeZone");
  const input6 = within(timeZone).getByRole("combobox");
  timeZone.focus();
  fireEvent.change(input6, { target: { value: "IST" } });
  fireEvent.keyDown(timeZone, { key: "ArrowDown" });
  fireEvent.keyDown(timeZone, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "Enter" }));

  const CIDRS = screen.getByPlaceholderText("Allowed CIDR");
  fireEvent.change(CIDRS, { target: { value: "0" } });

  const status = screen.getByTestId("status");
  const input7 = within(status).getByRole("combobox");
  status.focus();
  fireEvent.change(input7, { target: { value: "Active" } });
  fireEvent.keyDown(status, { key: "ArrowDown" });
  fireEvent.keyDown(status, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(status, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(status, { key: "Enter" }));

  const startDate = screen.getByPlaceholderText("Start Date");
  await user.type(startDate, "2022-01-02");

  const endDate = screen.getByPlaceholderText("End Date");
  fireEvent.change(endDate, { target: { value: "2023-01-02" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "password" } });

  const reEnterPassword = screen.getByPlaceholderText("Re-enter Password");
  fireEvent.change(reEnterPassword, { target: { value: "password" } });

  const Save = screen.getByTestId("Save");
  fireEvent.click(Save)
  const successResponse = await screen.findByText('User Record Created Successfully')
  expect(successResponse).toBeInTheDocument()

  const Password = screen.getByTestId("KeyIcon");
  await user.click(Password);

  fireEvent.change(password, { target: { value: "new_password" } });
  fireEvent.change(reEnterPassword, { target: { value: "new_password" } });

  fireEvent.click(Save)

  const response = await screen.findByText('Password Updated successfully')
  expect(response).toBeInTheDocument()
}, 30000);

it("Click on the Delete button and make sure a prompt appears, click cancel and verify the prompt closes", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  await waitFor(() => expect(screen.getByTestId("Save")).toBeInTheDocument());

  const employeeID = screen.getByPlaceholderText("Employee ID");
  fireEvent.change(employeeID, { target: { value: "ahales" } });

  const firstName = screen.getByPlaceholderText("First Name");
  fireEvent.change(firstName, { target: { value: "Alex" } });

  const lastName = screen.getByPlaceholderText("Last Name");
  fireEvent.change(lastName, { target: { value: "Hales" } });

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "ahales@gmail.com" } });

  const phone = screen.getByPlaceholderText("Phone");
  fireEvent.change(phone, { target: { value: "+91 99965 45656" } });

  const organizationCode = screen.getByTestId("organizationCode");
  const input1 = within(organizationCode).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input1, { target: { value: "R3 Services" } });
  fireEvent.keyDown(organizationCode, { key: "ArrowDown" });
  fireEvent.keyDown(organizationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "Enter" }));

  const role = screen.getByTestId("role");
  const input2 = within(role).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input2, { target: { value: "Manager" } });
  fireEvent.keyDown(role, { key: "ArrowDown" });
  fireEvent.keyDown(role, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(role, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(role, { key: "Enter" }));

  const countryCode = screen.getByTestId("countryCode");
  const input3 = within(countryCode).getByRole("combobox");
  countryCode.focus();
  fireEvent.change(input3, { target: { value: "United States of America" } });
  fireEvent.keyDown(countryCode, { key: "ArrowDown" });
  fireEvent.keyDown(countryCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "Enter" }));

  const locationCode = screen.getByTestId("locationCode");
  const input4 = within(locationCode).getByRole("combobox");
  locationCode.focus();
  fireEvent.change(input4, { target: { value: "Bettendorf, USA" } });
  fireEvent.keyDown(locationCode, { key: "ArrowDown" });
  fireEvent.keyDown(locationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "Enter" }));

  const locale = screen.getByTestId("locale");
  const input5 = within(locale).getByRole("combobox");
  locale.focus();
  fireEvent.change(input5, { target: { value: "US English" } });
  fireEvent.keyDown(locale, { key: "ArrowDown" });
  fireEvent.keyDown(locale, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locale, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locale, { key: "Enter" }));

  const timeZone = screen.getByTestId("timeZone");
  const input6 = within(timeZone).getByRole("combobox");
  timeZone.focus();
  fireEvent.change(input6, { target: { value: "IST" } });
  fireEvent.keyDown(timeZone, { key: "ArrowDown" });
  fireEvent.keyDown(timeZone, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "Enter" }));

  const CIDRS = screen.getByPlaceholderText("Allowed CIDR");
  fireEvent.change(CIDRS, { target: { value: "0" } });

  const status = screen.getByTestId("status");
  const input7 = within(status).getByRole("combobox");
  status.focus();
  fireEvent.change(input7, { target: { value: "Active" } });
  fireEvent.keyDown(status, { key: "ArrowDown" });
  fireEvent.keyDown(status, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(status, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(status, { key: "Enter" }));

  const startDate = screen.getByPlaceholderText("Start Date");
  await user.type(startDate, "2022-01-02");

  const endDate = screen.getByPlaceholderText("End Date");
  fireEvent.change(endDate, { target: { value: "2023-01-02" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "password" } });

  const reEnterPassword = screen.getByPlaceholderText("Re-enter Password");
  fireEvent.change(reEnterPassword, { target: { value: "password" } });

  const Save = screen.getByTestId("Save");
  fireEvent.click(Save)

  const successResponse = await screen.findByText('User Record Created Successfully')
  expect(successResponse).toBeInTheDocument()

  const Delete = screen.getByTestId("Delete");
  fireEvent.click(Delete)

  await waitFor(() => expect(screen.getByTestId("Yes")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByTestId("No")).toBeInTheDocument());

  const No = screen.getByTestId("No");
  fireEvent.click(No)
  await waitFor(() => expect(screen.getByTestId("Save")).toBeInTheDocument());

}, 30000);

it("Click on the Delete button and make sure a prompt appears, click confirm, data removes from the list and control goes to list page", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  await waitFor(() => expect(screen.getByTestId("Save")).toBeInTheDocument());

  const employeeID = screen.getByPlaceholderText("Employee ID");
  fireEvent.change(employeeID, { target: { value: "ahales" } });

  const firstName = screen.getByPlaceholderText("First Name");
  fireEvent.change(firstName, { target: { value: "Alex" } });

  const lastName = screen.getByPlaceholderText("Last Name");
  fireEvent.change(lastName, { target: { value: "Hales" } });

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "ahales@gmail.com" } });

  const phone = screen.getByPlaceholderText("Phone");
  fireEvent.change(phone, { target: { value: "+91 99965 45656" } });

  const organizationCode = screen.getByTestId("organizationCode");
  const input1 = within(organizationCode).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input1, { target: { value: "R3 Services" } });
  fireEvent.keyDown(organizationCode, { key: "ArrowDown" });
  fireEvent.keyDown(organizationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "Enter" }));

  const role = screen.getByTestId("role");
  const input2 = within(role).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input2, { target: { value: "Manager" } });
  fireEvent.keyDown(role, { key: "ArrowDown" });
  fireEvent.keyDown(role, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(role, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(role, { key: "Enter" }));

  const countryCode = screen.getByTestId("countryCode");
  const input3 = within(countryCode).getByRole("combobox");
  countryCode.focus();
  fireEvent.change(input3, { target: { value: "United States of America" } });
  fireEvent.keyDown(countryCode, { key: "ArrowDown" });
  fireEvent.keyDown(countryCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "Enter" }));

  const locationCode = screen.getByTestId("locationCode");
  const input4 = within(locationCode).getByRole("combobox");
  locationCode.focus();
  fireEvent.change(input4, { target: { value: "Bettendorf, USA" } });
  fireEvent.keyDown(locationCode, { key: "ArrowDown" });
  fireEvent.keyDown(locationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "Enter" }));

  const locale = screen.getByTestId("locale");
  const input5 = within(locale).getByRole("combobox");
  locale.focus();
  fireEvent.change(input5, { target: { value: "US English" } });
  fireEvent.keyDown(locale, { key: "ArrowDown" });
  fireEvent.keyDown(locale, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locale, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locale, { key: "Enter" }));

  const timeZone = screen.getByTestId("timeZone");
  const input6 = within(timeZone).getByRole("combobox");
  timeZone.focus();
  fireEvent.change(input6, { target: { value: "IST" } });
  fireEvent.keyDown(timeZone, { key: "ArrowDown" });
  fireEvent.keyDown(timeZone, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "Enter" }));

  const CIDRS = screen.getByPlaceholderText("Allowed CIDR");
  fireEvent.change(CIDRS, { target: { value: "0" } });

  const status = screen.getByTestId("status");
  const input7 = within(status).getByRole("combobox");
  status.focus();
  fireEvent.change(input7, { target: { value: "Active" } });
  fireEvent.keyDown(status, { key: "ArrowDown" });
  fireEvent.keyDown(status, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(status, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(status, { key: "Enter" }));

  const startDate = screen.getByPlaceholderText("Start Date");
  await user.type(startDate, "2022-01-02");

  const endDate = screen.getByPlaceholderText("End Date");
  fireEvent.change(endDate, { target: { value: "2023-01-02" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "password" } });

  const reEnterPassword = screen.getByPlaceholderText("Re-enter Password");
  fireEvent.change(reEnterPassword, { target: { value: "password" } });

  const Save = screen.getByTestId("Save");
  fireEvent.click(Save)
  const successResponse = await screen.findByText('User Record Created Successfully')
  expect(successResponse).toBeInTheDocument()

  const Delete = screen.getByTestId("Delete");
  fireEvent.click(Delete)
  await waitFor(() => expect(screen.getByTestId("Yes")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByTestId("No")).toBeInTheDocument());
  const Yes = screen.getByTestId("Yes");
  fireEvent.click(Yes)
  await waitFor(() => expect(screen.getByTestId("Action")).toBeInTheDocument());
}, 30000);

it("Change all the information clicking on switch to view button reset back to the original data", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  await waitFor(() => expect(screen.getByTestId("Save")).toBeInTheDocument());

  const employeeID = screen.getByPlaceholderText("Employee ID");
  fireEvent.change(employeeID, { target: { value: "ahales" } });

  const firstName = screen.getByPlaceholderText("First Name");
  fireEvent.change(firstName, { target: { value: "Alex" } });

  const lastName = screen.getByPlaceholderText("Last Name");
  fireEvent.change(lastName, { target: { value: "Hales" } });

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "ahales@gmail.com" } });

  const phone = screen.getByPlaceholderText("Phone");
  fireEvent.change(phone, { target: { value: "+91 99965 45656" } });

  const organizationCode = screen.getByTestId("organizationCode");
  const input1 = within(organizationCode).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input1, { target: { value: "R3 Services" } });
  fireEvent.keyDown(organizationCode, { key: "ArrowDown" });
  fireEvent.keyDown(organizationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(organizationCode, { key: "Enter" }));

  const role = screen.getByTestId("role");
  const input2 = within(role).getByRole("combobox");
  organizationCode.focus();
  fireEvent.change(input2, { target: { value: "Manager" } });
  fireEvent.keyDown(role, { key: "ArrowDown" });
  fireEvent.keyDown(role, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(role, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(role, { key: "Enter" }));

  const countryCode = screen.getByTestId("countryCode");
  const input3 = within(countryCode).getByRole("combobox");
  countryCode.focus();
  fireEvent.change(input3, { target: { value: "United States of America" } });
  fireEvent.keyDown(countryCode, { key: "ArrowDown" });
  fireEvent.keyDown(countryCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(countryCode, { key: "Enter" }));

  const locationCode = screen.getByTestId("locationCode");
  const input4 = within(locationCode).getByRole("combobox");
  locationCode.focus();
  fireEvent.change(input4, { target: { value: "Bettendorf, USA" } });
  fireEvent.keyDown(locationCode, { key: "ArrowDown" });
  fireEvent.keyDown(locationCode, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locationCode, { key: "Enter" }));

  const locale = screen.getByTestId("locale");
  const input5 = within(locale).getByRole("combobox");
  locale.focus();
  fireEvent.change(input5, { target: { value: "US English" } });
  fireEvent.keyDown(locale, { key: "ArrowDown" });
  fireEvent.keyDown(locale, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(locale, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(locale, { key: "Enter" }));

  const timeZone = screen.getByTestId("timeZone");
  const input6 = within(timeZone).getByRole("combobox");
  timeZone.focus();
  fireEvent.change(input6, { target: { value: "IST" } });
  fireEvent.keyDown(timeZone, { key: "ArrowDown" });
  fireEvent.keyDown(timeZone, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(timeZone, { key: "Enter" }));

  const CIDRS = screen.getByPlaceholderText("Allowed CIDR");
  fireEvent.change(CIDRS, { target: { value: "0" } });

  const status = screen.getByTestId("status");
  const input7 = within(status).getByRole("combobox");
  status.focus();
  fireEvent.change(input7, { target: { value: "Active" } });
  fireEvent.keyDown(status, { key: "ArrowDown" });
  fireEvent.keyDown(status, { key: "Enter" });
  await waitFor(() => fireEvent.keyDown(status, { key: "ArrowDown" }));
  await waitFor(() => fireEvent.keyDown(status, { key: "Enter" }));

  const startDate = screen.getByPlaceholderText("Start Date");
  await user.type(startDate, "2022-01-02");

  const endDate = screen.getByPlaceholderText("End Date");
  fireEvent.change(endDate, { target: { value: "2023-01-02" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "password" } });

  const reEnterPassword = screen.getByPlaceholderText("Re-enter Password");
  fireEvent.change(reEnterPassword, { target: { value: "password" } });

  const Save = screen.getByTestId("Save");
  fireEvent.click(Save)
  const successResponse = await screen.findByText('User Record Created Successfully')
  expect(successResponse).toBeInTheDocument()

  fireEvent.change(firstName, { target: { value: "Alexa" } });

  const View = screen.getByTestId("VisibilityIcon");
  fireEvent.click(View)

  const Update = screen.getByTestId("CreateIcon");
  fireEvent.click(Update)

  let name = await screen.findByPlaceholderText("First Name");
  expect(name.value).toBe("Alex")

}, 30000);

it("details view shows in Primary language", async () => {
  global.navigator = { languages: ['mr'] }
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  expect(await screen.findByTestId("Save")).toBeInTheDocument();
  expect(screen.getByText("पहिले नाव:")).toBeInTheDocument();
});

it("details view shows in Secondary language", async () => {
  global.navigator = { languages: ['hi'] }
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  const action = screen.getByTestId("Action");
  expect(action).toBeInTheDocument();
  fireEvent.click(action)
  await waitFor(() => expect(screen.getByTestId("Save")).toBeInTheDocument());
  expect(screen.getByText("पहला नाम:")).toBeInTheDocument();
});