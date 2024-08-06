import React from "react";
import { useState } from "react";
import logo from "../assets/logo.svg";
import {
  Toolbar,
  Stack,
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import TimerIcon from "@mui/icons-material/Timer";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode, setFilter, clearMessage } from "../slices/users";
import intlLabel from "../internationalization";

function Navbar() {
  const [settings, setSettings] = useState(null);
  const [resourses, setResourses] = useState(null);
  const [profile, setProfile] = useState(null);
  const open = Boolean(settings);
  const openResourses = Boolean(resourses);
  const open1 = Boolean(profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setSettings(event.currentTarget);
  };

  const handleClose = () => {
    setSettings(null);
  };

  const handleResoursesClick = (event) => {
    setResourses(event.currentTarget);
  };

  const handleResoursesClose = () => {
    setResourses(null);
  };

  const handleClick1 = (event) => {
    setProfile(event.currentTarget);
  };

  const handleClose1 = () => {
    setProfile(null);
  };

  const handleCloseUsers = () => {
    setSettings(null);
    dispatch(setMode(""));
    dispatch(clearMessage());
    dispatch(setFilter(""));
    navigate("/");
  };

  return (
    <>
      <Box position="fixed-top" style={{ background: "#eeeeee" }}>
        <Toolbar disableGutters>
          <Stack direction="row" spacing={2}>
            <Box
              component="span"
              style={{ paddingLeft: "18px", paddingTop: "6px" }}
            >
              <img height="35" width="160" src={logo} />
            </Box>
            <Button
              variant="text"
              size="small"
              style={{
                border: "none",
                outline: "none",
                padding: "2px",
              }}
              sx={{ ".css-y6rp3m-MuiButton-startIcon": { marginRight: "3px" } }}
              startIcon={
                <HomeIcon
                  style={{
                    color: "primary",
                    paddingLeft: "1px",
                    paddingBottom: "0.5px",
                  }}
                />
              }
            >
              <Typography
                variant="button"
                style={{
                  color: "GrayText",
                  fontSize: 15,
                  paddingLeft: "-2px",
                  textTransform: "none",
                }}
              >
                {intlLabel("Clock Time")}
              </Typography>
            </Button>

            <Button
              variant="text"
              size="small"
              style={{
                border: "none",
                outline: "none",
                padding: "0px",
              }}
              sx={{ ".css-y6rp3m-MuiButton-startIcon": { marginRight: "3px" } }}
              startIcon={<FormatListBulletedIcon style={{ color: "green" }} />}
            >
              <Typography
                variant="button"
                style={{
                  color: "GrayText",
                  fontSize: 15,
                  textTransform: "none",
                }}
              >
                {intlLabel("Timelog")}
              </Typography>
            </Button>

            <Button
              variant="text"
              color="inherit"
              size="small"
              style={{
                border: "none",
                outline: "none",
                padding: "0px",
              }}
              sx={{ ".css-y6rp3m-MuiButton-startIcon": { marginRight: "3px" } }}
              startIcon={<SportsFootballIcon style={{ color: "brown" }} />}
            >
              <Typography
                variant="button"
                style={{
                  color: "GrayText",
                  fontSize: 15,
                  textTransform: "none",
                }}
              >
                {intlLabel("Vacation")}
              </Typography>
            </Button>

            <Button
              variant="text"
              size="small"
              style={{
                border: "none",
                outline: "none",
                padding: "0px",
              }}
              sx={{ ".css-y6rp3m-MuiButton-startIcon": { marginRight: "3px" } }}
              startIcon={<BeachAccessIcon style={{ color: "maroon" }} />}
            >
              <Typography
                variant="button"
                style={{
                  color: "GrayText",
                  fontSize: 15,
                  textTransform: "none",
                }}
              >
                {intlLabel("Holiday")}
              </Typography>
            </Button>

            <Button
              variant="text"
              size="small"
              style={{
                border: "none",
                outline: "none",
                padding: "0px",
              }}
              sx={{ ".css-y6rp3m-MuiButton-startIcon": { marginRight: "0px" } }}
              startIcon={<AccountTreeIcon style={{ color: "green" }} />}
            >
              <Typography
                variant="button"
                style={{
                  color: "GrayText",
                  fontSize: 15,
                  width: 100,
                  textTransform: "none",
                }}
              >
                {intlLabel("Project Time")}
              </Typography>
            </Button>

            <Button
              variant="text"
              size="small"
              style={{
                border: "none",
                outline: "none",
                padding: "0px",
              }}
              sx={{ ".css-y6rp3m-MuiButton-startIcon": { marginRight: "3px" } }}
              startIcon={
                <MonetizationOnIcon
                  style={{ color: "darkred" }}
                  fontSize="medium"
                />
              }
            >
              <Typography
                variant="button"
                style={{
                  color: "GrayText",
                  fontSize: 15,
                  textTransform: "none",
                }}
              >
                {intlLabel("Time Summary")}
              </Typography>
            </Button>

            <Button
              variant="text"
              size="small"
              style={{
                border: "none",
                outline: "none",
                padding: "0px",
              }}
              sx={{ ".css-y6rp3m-MuiButton-startIcon": { marginRight: "3px" } }}
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              startIcon={<SettingsIcon style={{ color: " darkturquoise" }} />}
              endIcon={
                <ArrowDropDownIcon size="small" style={{ color: "black" }} />
              }
            >
              <Typography
                variant="button"
                style={{
                  color: "GrayText",
                  fontSize: 15,
                  textTransform: "none",
                }}
              >
                {intlLabel("Settings")}
              </Typography>
            </Button>
            <Menu
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={settings}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>
                <PaymentIcon
                  size="small"
                  style={{ color: "green", marginRight: "7px" }}
                />
                {intlLabel("Pay Periods")}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <TimerIcon
                  size="small"
                  style={{ color: "maroon", marginRight: "7px" }}
                />
                {intlLabel("Pay Profile")}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseUsers}>
                <PeopleIcon
                  size="small"
                  style={{ color: "orange", marginRight: "7px" }}
                />
                {intlLabel("Users")}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <LocationOnIcon
                  size="small"
                  style={{ color: "blue", marginRight: "7px" }}
                />
                {intlLabel("Locations")}
              </MenuItem>
            </Menu>

            <Button
              variant="text"
              color="inherit"
              size="small"
              style={{
                border: "none",
                outline: "none",
                padding: "0px",
              }}
              sx={{ ".css-y6rp3m-MuiButton-startIcon": { marginRight: "3px" } }}
              aria-controls={openResourses ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openResourses ? "true" : undefined}
              onClick={handleResoursesClick}
              startIcon={
                <PermContactCalendarIcon style={{ color: " orange" }} />
              }
              endIcon={
                <ArrowDropDownIcon size="small" style={{ color: "black" }} />
              }
            >
              <Typography
                variant="button"
                style={{
                  color: "GrayText",
                  fontSize: 15,
                  textTransform: "none",
                }}
              >
                {intlLabel("Human Resources")}
              </Typography>
            </Button>
            <Menu
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={resourses}
              open={openResourses}
              onClose={handleResoursesClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleResoursesClose}>
                <PermContactCalendarIcon
                  style={{ color: "blue", marginRight: "7px" }}
                />{" "}
                {intlLabel("Employee")}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleResoursesClose}>
                <AccountCircleIcon
                  style={{ color: "orange", marginRight: "7px" }}
                />{" "}
                {intlLabel("Review")}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleResoursesClose}>
                <PersonAddAltIcon
                  style={{ color: "purple", marginRight: "7px" }}
                />{" "}
                {intlLabel("Applicants")}
              </MenuItem>
            </Menu>

            <Button
              variant="text"
              size="small"
              style={{
                border: "none",
                outline: "none",
                position: "absolute",
                right: "18px",
                top: "23%",
              }}
              sx={{ ".css-y6rp3m-MuiButton-startIcon": { marginRight: "3px" } }}
              flex={2}
              aria-controls={open1 ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? "true" : undefined}
              onClick={handleClick1}
              startIcon={
                <PersonIcon style={{ color: "purple" , position: "absolute", right: "129px", top: "7px" }} fontSize="medium" />
              }
              endIcon={
                <ArrowDropDownIcon size="small" style={{ color: "black" }} />
              }
            >
              <Typography
                variant="button"
                style={{
                  color: "GrayText",
                  fontSize: 15,
                  textTransform: "none",
                }}
              >
                
                {intlLabel("Aditya Lonkar")}
              </Typography>
            </Button>
            <Menu
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={profile}
              open={open1}
              onClose={handleClose1}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose1}>
                <PersonIcon
                  style={{ color: "purple", marginRight: "7px" }}
                  fontSize="medium"
                />
                <Typography
                  variant="button"
                  style={{ fontSize: 15, textTransform: "none" }}
                >
                  {intlLabel("Aditya Lonkar")}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose1}>
                <PersonIcon
                  style={{ color: "purple", marginRight: "7px" }}
                  fontSize="medium"
                />
                <Typography
                  variant="button"
                  style={{ fontSize: 15, textTransform: "none" }}
                >
                  {intlLabel("Change Password")}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose1}>
                <PersonIcon
                  style={{ color: "purple", marginRight: "7px" }}
                  fontSize="medium"
                />
                <Typography
                  variant="button"
                  style={{ fontSize: 15, textTransform: "none" }}
                >
                  {intlLabel("Change PassPhrase")}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose1}>
                <LogoutIcon
                  style={{ color: "red", marginRight: "7px" }}
                  fontSize="medium"
                />
                <Typography
                  variant="button"
                  style={{ fontSize: 15, textTransform: "none" }}
                >
                  {intlLabel("Logout")}
                </Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Box>
    </>
  );
}

export default Navbar;
