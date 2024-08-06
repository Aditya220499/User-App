import _ from "lodash";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";
import intlLabel from "../internationalization"
import {
  Grid,
  Toolbar,
  TextField,
  FormControl,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Fade,
  Popover,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  getAllUsers,
  setMode,
  getFilterList,
  setFilter,
  setMessage,
} from "../slices/users";

function List() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterValue, setFilterValue] = useState();

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const fetchData = useSelector((state) => state.data);
  const fetchFilter = useSelector((state) => state.filter);
  const fetchMessage = useSelector((state) => state.msg);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchFilter == "") {
      dispatch(getAllUsers());
      setFilterValue("");
    } else {
      setFilterValue(fetchFilter);
      dispatch(getFilterList(fetchFilter));
    }
  }, [fetchFilter]);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    var debounce_fun = _.debounce(function () {
      dispatch(getFilterList(e.target.value));
    }, 3000);
    debounce_fun();
  };
  return (
    <>
      <Grid container>
        <Grid
          item
          xl={12}
          style={{ backgroundColor: "#17a2b8", alignContent: "center" }}
        >
          <Typography
            component="span"
            style={{
              color: "white",
              fontSize: 16,
              position: "relative",
              top: "15%",
            }}
            pl={20}
            pr={3}
          >
            {intlLabel("Filter-By")}:
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="Filter"
            variant="outlined"
            size="small"
            data-testid="Filter"
            onChange={handleFilterChange}
            value={filterValue}
            style={{ background: "white" }}
          />
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead style={{ background: "black" }}>
              <TableRow>
                <TableCell style={{ color: "white", paddingRight: "0px" }}>
                {intlLabel("Action")}
                  <Button
                  data-testid="Action"
                    style={{
                      border: "none",
                      outline: "none",
                      marginRight: "-10px",
                      marginLeft: "-15px",
                    }}
                    onClick={() => {
                      dispatch(setMode("Create"));
                      dispatch(setMessage(""));
                      navigate("/user");
                    }}
                  >
                    <AddCircleIcon style={{ color: "yellow" }} />
                  </Button>
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  #
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                {intlLabel("Employee ID")}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                {intlLabel("First Name")}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                {intlLabel("Last Name")}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                {intlLabel("Email")}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                {intlLabel("Phone")}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                {intlLabel("Org Code")}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                {intlLabel("Role")}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                {intlLabel("Location")}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                {intlLabel("Start Date")}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                {intlLabel("Password")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchData.employeeList
                ? fetchData.employeeList.map((row, index) => {
                    return <ListItem row={row} key={index} />;
                  })
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {!fetchData.employeeList ? (
        <Grid
          item
          md={12}
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "15px",
          }}
          
        >
          {fetchMessage.text != "" ? (
            <Typography style={{ fontSize: 20 }} color={fetchMessage.code} data-testid="MessageIO" >
              {intlLabel(fetchMessage.text)}
            </Typography>
          ) : (
            ""
          )}
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}

export default List;
