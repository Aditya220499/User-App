import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  getUserDetail,
  getAllUsers,
  setMode,
  setMessage,
  putEditRecord,
  patchChangePassword,
  postCreateRecord,
  deleteRecord,
  clearMessage,
} from "../slices/users";
import {
  Grid,
  Box,
  TextField,
  Autocomplete,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormHelperText
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyIcon from "@mui/icons-material/Key";
import intlLabel from "../internationalization"
import { useFormik } from "formik";
import * as yup from "yup";

const optionsOrgCode = [
  { id: "", label: "" },
  { id: "R3 Services", label: "R3 Services" },
  { id: "ACE Company", label: "ACE Company" },
];

const optionsRole = [
  { id: "", label: "" },
  { id: "Manager", label: "Manager" },
  { id: "Admin", label: "Admin" },
  { id: "Consultant", label: "Consultant" },
  { id: "User", label: "User" },
];

const optionsCountry = [
  { id: "", label: "" },
  { id: "United States of America", label: "United States of America" },
  { id: "India", label: "India" },
];

const optionsLocale = [
  { id: "", label: "" },
  { id: "US English", label: "US English" },
  { id: "India English", label: "India English" },
];

const optionsLocation = [
  { id: "", label: "" },
  { id: "Bettendorf, USA", label: "Bettendorf, USA" },
  { id: "Hyderabad, India", label: "Hyderabad, India" },
  { id: "Work From Home, India", label: "Work From Home, India" },
  { id: "Work From Home, USA", label: "Work From Home, USA" },
];

const optionsTimeZone = [
  { id: "", label: "" },
  { id: "IST", label: "IST" },
  { id: "CST", label: "CST" },
  { id: "EST", label: "EST" },
  { id: "MST", label: "MST" },
];

const optionsStatus = [
  { id: "", label: "" },
  { id: "Active", label: "Active" },
  { id: "Inactive", label: "Inactive" },
  { id: "Pending", label: "Pending" },
];

const initialData = {
  ID: "",
  employeeID: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organizationCode: "",
  role: "",
  countryCode: "",
  locationCode: "",
  locale: "",
  timeZone: "",
  CIDRS: "",
  startDate: "",
  endDate: "",
  password: "",
  status: "",
  reEnterPassword : ""
};

function Details() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const fetchMode = useSelector((state) => state.mode);
  const fetchData = useSelector((state) => state.userData);
  const fetchMessage = useSelector((state) => state.msg);

  useEffect(() => {
    if (
      fetchMode === "View" ||
      fetchMode === "Edit" ||
      fetchMode === "ChangePassword"
    ) {
      setValues({
        ID: fetchData ? fetchData.ID : "",
        employeeID: fetchData ? fetchData.employeeID : "",
        firstName: fetchData ? fetchData.firstName : "",
        lastName: fetchData ? fetchData.lastName : "",
        email: fetchData ? fetchData.email : "",
        phone: fetchData ? fetchData.phone : "",
        organizationCode: fetchData ? fetchData.organizationCode : "",
        role: fetchData ? fetchData.role : "",
        countryCode: fetchData ? fetchData.countryCode : "",
        locationCode: fetchData ? fetchData.locationCode : "",
        locale: fetchData ? fetchData.locale : "",
        timeZone: fetchData ? fetchData.timeZone : "",
        CIDRS: fetchData ? fetchData.CIDRS : "",
        startDate: fetchData ? fetchData.startDate : "",
        endDate: fetchData ? fetchData.endDate : "",
        password: fetchData ? fetchData.password : "",
        status: fetchData ? fetchData.status : "",
        reEnterPassword: fetchData ? fetchData.password : ""
      });
    }
  }, [fetchData, fetchMode]);

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setFieldValue, setFieldTouched } = useFormik({
    initialValues: initialData,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
        ID: yup.string(),
        employeeID: yup.string().required("Employee ID is Required"),
        firstName: yup.string().required("First Name is Required"),
        lastName: yup.string().required("Last Name is Required"),
        email: yup.string().email().required("Email is Required"),
        phone: yup.string().required("Phone is Required"),
        organizationCode: yup.string().required("Organization code is Required"),
        role: yup.string().required("Role is Required"),
        countryCode: yup.string().required("Country Code is Required"),
        locationCode: yup.string().required("Location code is Required"),
        locale: yup.string().required("Locale is Required"),
        timeZone: yup.string().required("Time Zone is Required"),
        CIDRS: yup.string(),
        startDate: yup.date().required("Start Date is Required"),
        endDate: yup.date(),
        password: yup.string().required("Password is Required"),
        status: yup.string().required("Status is Required"),
        reEnterPassword: yup.string().required("Please ReEnter the Password").oneOf([yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: (values, errors) => {
      if (fetchMode === "Edit") {
        dispatch(putEditRecord(values.ID, values));
      } else if (fetchMode === "ChangePassword") {
        if (
          values.password !== "" &&
          (values.reEnterPassword === "" ||
            values.reEnterPassword !== values.password)
        ) {
          dispatch(
            setMessage({
              text: "Passwords must match",
              code: "blue",
            })
          );
        } else {
          dispatch(patchChangePassword(values.ID, values));
        }
      } else if (fetchMode === "Create") {
        if (
          values.password !== "" &&
          (values.reEnterPassword === "" ||
            values.reEnterPassword !== values.password)
        ) {
          dispatch(
            setMessage({
              text: "Passwords must match",
              code: "blue",
            })
          );
        } else {
          dispatch(postCreateRecord(values));
        }
      }
    },
});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleClickClose();
    dispatch(setMode(""));
    dispatch(deleteRecord(values.ID));
    navigate("/");
  };

  return (
    <div>
      <Box sx={{ width: "80%", border: 1, color: "#2196f3" }} mt={1} mx={20}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item md={2} paddingTop={3}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16 }}
                  mr="15%"
                >
                  {intlLabel("User ID")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={3}>
              <Box display={"flex"}>
                <TextField
                  disabled
                  style={{ backgroundColor: "#e9ecef", width: "85%" }}
                  size="small"
                  name="ID"
                  data-testid="ID"
                  placeholder="#"
                  value={values.ID}
                />
                  </Box>
                {errors.ID && touched.ID ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.ID} </FormHelperText>
                    ) : null}
            </Grid>
            <Grid item md={2} paddingTop={3}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Employee ID")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={3}>
              <Box display={"flex"}>
                <TextField
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  size="small"
                  name="employeeID"
                  data-testid="employeeID"
                  placeholder="Employee ID"
                  value={values.employeeID}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />                       
                  </Box>
                {errors.employeeID && touched.employeeID ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.employeeID} </FormHelperText>
                    ) : null}
            </Grid>

            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("First Name")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <TextField
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  size="small"
                  name="firstName"
                  data-testid="firstName"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
                  </Box>
                {errors.firstName && touched.firstName ? (
                  <FormHelperText style={{ color: "#bf3333" }}>{errors.firstName} </FormHelperText>
                    ) : null}
            </Grid>
            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Last Name")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <TextField
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  size="small"
                  name="lastName"
                  data-testid="lastName"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                  </Box>
                {errors.lastName && touched.lastName ? (
                  <FormHelperText style={{ color: "#bf3333" }}>{errors.lastName} </FormHelperText>
                    ) : null}
            </Grid>

            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Email")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <TextField
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  size="small"
                  name="email"
                  data-testid="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                  </Box>
                {errors.email && touched.email ? (
                  <FormHelperText style={{ color: "#bf3333" }}>{errors.email} </FormHelperText>
                    ) : null}
            </Grid>
            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Phone")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <TextField
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  size="small"
                  name="phone"
                  data-testid="phone"
                  placeholder="Phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                  </Box>
                {errors.phone && touched.phone ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.phone} </FormHelperText>
                    ) : null}
            </Grid>

            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Org Code")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <Autocomplete
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  disablePortal
                  options={optionsOrgCode}
                  value={
                    optionsOrgCode.find(
                      (e) => e.id === values.organizationCode
                    ) || ""
                  }
                  onChange={(event, values) =>
                    setFieldValue("organizationCode", values.id ? values.id : null)
                  }
                  getOptionLabel={(option) => option.label || ""}
                  isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                 }
                  size="small"
                  name="organizationCode"
                  data-testid="organizationCode"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Org Code" />
                  )}
                  onBlur={(e)=>{
                    setFieldTouched("organizationCode", true);
                    handleBlur(e)
                  }}
                />
                  </Box>
                {errors.organizationCode && touched.organizationCode ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.organizationCode} </FormHelperText>
                    ) : null}
            </Grid>
            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Role")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <Autocomplete
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  disablePortal
                 options={optionsRole}
                  value={optionsRole.find((e) => e.id === values.role) || ""}
                  onChange={(event, values) =>
                    setFieldValue("role", values.id ? values.id : null)
                  }
                  onBlur={(e)=>{
                    setFieldTouched("role", true);
                    handleBlur(e)
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                 }
                  size="small"
                  name="role"
                  data-testid="role"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Role" />
                  )}
                />
                  </Box>
                {errors.role && touched.role ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.role} </FormHelperText>
                    ) : null}
            </Grid>

            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Country")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <Autocomplete
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  disablePortal
                  options={optionsCountry}
                  value={
                    optionsCountry.find((e) => e.id === values.countryCode) || ""
                  }
                  onChange={(event, values) =>
                    setFieldValue("countryCode", values.id ? values.id : null)
                  }
                  onBlur={(e)=>{
                    setFieldTouched("countryCode", true);
                    handleBlur(e)
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                 }
                  size="small"
                  name="countryCode"
                  data-testid="countryCode"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Country" />
                  )}
                />
                  </Box>
                {errors.countryCode && touched.countryCode ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.countryCode} </FormHelperText>
                    ) : null}
            </Grid>
            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Location")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <Autocomplete
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  disablePortal
                  options={optionsLocation}
                  value={
                    optionsLocation.find((e) => e.id === values.locationCode) ||
                    ""
                  }
                  onChange={(event, values) =>
                    setFieldValue("locationCode", values.id ? values.id : null)
                  }
                  onBlur={(e)=>{
                    setFieldTouched("locationCode", true);
                    handleBlur(e)
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                 }
                  size="small"
                  name="locationCode"
                  data-testid="locationCode"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Location" />
                  )}
                />
                  </Box>
                {errors.locationCode && touched.locationCode ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.locationCode} </FormHelperText>
                    ) : null}
            </Grid>

            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Locale")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <Autocomplete
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  disablePortal
                  options={optionsLocale}
                  value={optionsLocale.find((e) => e.id === values.locale) || ""}
                  onChange={(event, values) =>
                    setFieldValue("locale", values.id ? values.id : null)
                  }
                  onBlur={(e)=>{
                    setFieldTouched("locale", true);
                    handleBlur(e)
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                 }
                  size="small"
                  name="locale"
                  data-testid="locale"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Locale" />
                  )}
                />
                  </Box>
                {errors.locale && touched.locale ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.locale} </FormHelperText>
                    ) : null}
            </Grid>
            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Timezone")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <Autocomplete
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  disablePortal
                  options={optionsTimeZone}
                  value={
                    optionsTimeZone.find((e) => e.id === values.timeZone) || ""
                  }
                  onChange={(event, values) =>
                    setFieldValue("timeZone", values.id ? values.id : null)
                  }
                  onBlur={(e)=>{
                    setFieldTouched("timeZone", true);
                    handleBlur(e)
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                 }
                  size="small"
                  name="timeZone"
                  data-testid="timeZone"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Timezone" />
                  )}
                />
                  </Box>
                {errors.timeZone && touched.timeZone ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.timeZone} </FormHelperText>
                    ) : null}
            </Grid>

            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Allowed CIDR")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <TextField
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  size="small"
                  name="CIDRS"
                  data-testid="CIDRS"
                  placeholder="Allowed CIDR"
                  value={values.CIDRS}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                  </Box>
                {errors.CIDRS && touched.CIDRS ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.CIDRS} </FormHelperText>
                    ) : null}
            </Grid>
            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Status")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <Autocomplete
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  disablePortal
                  options={optionsStatus}
                  value={optionsStatus.find((e) => e.id === values.status) || ""}
                  onChange={(event, values) =>
                    setFieldValue("status", values.id ? values.id : null)
                  }
                  onBlur={(e)=>{
                    setFieldTouched("status", true);
                    handleBlur(e)
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                 }
                  size="small"
                  name="status"
                  data-testid="status"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Status" />
                  )}
                />
                  </Box>
                {errors.status && touched.status ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.status} </FormHelperText>
                    ) : null}
            </Grid>

            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Start Date")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <TextField
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  size="small"
                  name="startDate"
                  data-testid="startDate"
                  type="date"
                  placeholder="Start Date"
                  value={values.startDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                  </Box>
                {errors.startDate && touched.startDate ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.startDate} </FormHelperText>
                    ) : null}
            </Grid>
            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("End Date")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} paddingTop={1}>
              <Box display={"flex"}>
                <TextField
                  disabled={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                  }
                  style={
                    fetchMode === "View" || fetchMode === "ChangePassword"
                      ? { backgroundColor: "#e9ecef", width: "85%" }
                      : { backgroundColor: "white", width: "85%" }
                  }
                  size="small"
                  name="endDate"
                  data-testid="endDate"
                  type="date"
                  placeholder="End Date"
                  value={values.endDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                  </Box>
                {errors.endDate && touched.endDate ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.endDate} </FormHelperText>
                    ) : null}
            </Grid>

            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Password")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={10} paddingTop={1}>
              <Box display={"flex"}>
                <TextField
                  disabled={fetchMode === "View" || fetchMode === "Edit"}
                  style={
                    fetchMode === "View" || fetchMode === "Edit"
                      ? { backgroundColor: "#e9ecef", width: "94%" }
                      : { backgroundColor: "white", width: "94%" }
                  }
                  size="small"
                  name="password"
                  data-testid="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                  </Box>
                {errors.password && touched.password ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.password} </FormHelperText>
                    ) : null}
            </Grid>

            <Grid item md={2} paddingTop={1}>
              <Box
                display={"flex"}
                style={{ justifyContent: "right", paddingTop: "4%" }}
              >
                <Typography
                  component="span"
                  style={{ color: "black", fontSize: 16, textAlign: "right" }}
                  mr="15%"
                >
                  {intlLabel("Re-Enter Password")}:
                </Typography>
              </Box>
            </Grid>
            <Grid item md={10} paddingTop={1}>
              <Box display={"flex"}>
                <TextField
                  disabled={fetchMode === "View" || fetchMode === "Edit"}
                  style={
                    fetchMode === "View" || fetchMode === "Edit"
                      ? { backgroundColor: "#e9ecef", width: "94%" }
                      : { backgroundColor: "white", width: "94%" }
                  }
                  size="small"
                  name="reEnterPassword"
                  data-testid="reEnterPassword"
                  type="password"
                  placeholder="Re-enter Password"
                  value={values.reEnterPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                  </Box>
                {errors.reEnterPassword && touched.reEnterPassword ? (
                      <FormHelperText style={{ color: "#bf3333" }}>{errors.reEnterPassword} </FormHelperText>
                    ) : null}
            </Grid>

            <Grid
              item
              md={12}
              style={{
                textAlign: "center",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              {fetchMessage != "" ? (
                <Typography style={{ fontSize: 20 }} color={fetchMessage.code} data-testid="Messages">
                  {intlLabel(fetchMessage.text)}
                </Typography>
              ) : (
                ""
              )}
            </Grid>

            <Grid item md={12} paddingBottom={3} justifyContent={"center"}>
              <Box
                display={"flex"}
                style={{ paddingTop: "1%", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  data-testid="Save"
                  sx={{
                    textTransform: "none",
                    fontSize: 15,
                    marginRight: 1,
                  }}
                  style={fetchMode === "View" ? { display: "none" } : {}}
                  startIcon={<SaveIcon style={{ color: "yellow" }} />}
                >
                  {intlLabel("Save")}
                </Button>

                <Button
                  variant="contained"
                  size="medium"
                  color="error"
                  data-testid="Delete"
                  sx={{
                    textTransform: "none",
                    fontSize: 15,
                    marginRight: 1.2,
                  }}
                  startIcon={<DeleteIcon style={{ color: "yellow " }} />}
                  style={fetchMode !== "Edit" ? { display: "none" } : {}}
                  onClick={handleClickOpen}
                >
                  {intlLabel("Delete")}
                </Button>

                <Dialog open={open} onClose={handleClickClose}>
                  <DialogContent>
                    <DialogContentText>
                    {intlLabel("Are you sure you want to delete this post?")}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClickClose}
                      data-testid="No"
                      sx={{ textTransform: "none" }}
                    >
                      {intlLabel("No")}
                    </Button>
                    <Button
                      onClick={handleDelete}
                      autoFocus
                      data-testid="Yes"
                      sx={{ textTransform: "none" }}
                    >
                      {intlLabel("Yes")}
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button
                  variant="outlined"
                  size="medium"
                  data-testid="UserList"
                  sx={{
                    textTransform: "none",
                    fontSize: 15,
                    marginRight: 1.2,
                  }}
                  onClick={() => {
                    dispatch(setMode(""));
                    dispatch(getUserDetail([]));
                    dispatch(clearMessage());
                    navigate("/");
                  }}
                >
                  {intlLabel("User List")}
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  data-testid="SwitchToUpdate"
                  sx={{
                    textTransform: "none",
                    fontSize: 15,
                    marginRight: 1.2,
                  }}
                  style={
                    fetchMode === "Edit" || fetchMode === "Create"
                      ? { display: "none" }
                      : {}
                  }
                  startIcon={<CreateIcon style={{ color: "red" }} />}
                  onClick={() => {
                    dispatch(setMode("Edit"));
                    dispatch(clearMessage());
                  }}
                >
                  {intlLabel("Switch to Update")}
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  data-testid="SwitchToView"
                  sx={{
                    textTransform: "none",
                    fontSize: 15,
                    marginRight: 1.2,
                  }}
                  style={
                    fetchMode === "Create" ||
                    fetchMode === "ChangePassword" ||
                    fetchMode === "View"
                      ? { display: "none" }
                      : {}
                  }
                  startIcon={<VisibilityIcon style={{ color: "blue" }} />}
                  onClick={() => {
                    dispatch(setMode("View"));
                    dispatch(clearMessage());
                    dispatch((getUser(values.ID)))
                  }}
                >
                  {intlLabel("Switch to View")}
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  data-testid="ChangePassword"
                  sx={{
                    textTransform: "none",
                    fontSize: 15,
                    marginRight: 1.2,
                  }}
                  style={
                    fetchMode === "Create" ||
                    fetchMode === "ChangePassword" ||
                    fetchMode === "View"
                      ? { display: "none" }
                      : {}
                  }
                  startIcon={<KeyIcon style={{ color: "blue" }} />}
                  onClick={() => {
                    dispatch(setMode("ChangePassword"));
                    dispatch(clearMessage());
                  }}
                >
                  {intlLabel("Change Password")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default Details;
