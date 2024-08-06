import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
  Fade,
  Popover,
} from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyIcon from '@mui/icons-material/Key';
import {getUser, getAllUsers, setMode} from '../slices/users';
import intlLabel from "../internationalization"

const ListItem = ({row}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;
  
    const [options, setOptions] = useState(null);
    const open = Boolean(options);
  
    const handleClick = (event) => {
      setOptions(event.currentTarget);
  };
  
  const handleClose = () => {
    setOptions(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
      <TableRow key={row.ID} data-testid="listitem">
            <TableCell >
            <Button
                            variant="text"
                            style={{
                                border: "none",
                                outline: "none",
                            }}
                            aria-controls={open ? "fade-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >      <MenuBookIcon style={{ color: "purple", marginRight:"0px" }}/> 
                        <ArrowDropDownIcon size="small" style={{ color: "black", marginLeft:'2px' }} />        
                           
                        </Button>
                        <Menu
                            MenuListProps={{
                                "aria-labelledby": "fade-button",
                            }}
                            anchorEl={options}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={() => {
                                                    dispatch(setMode('View'))
                                                    dispatch((getUser(row.ID)))
                                                    navigate("/user/" + row.ID)
                                                  }
                                              }><VisibilityIcon style={{ color: "blue", marginRight:'7px' }} /> {intlLabel("View")}</MenuItem>
                            <MenuItem onClick={() =>{
                                                  dispatch(setMode('Edit'))
                                                  dispatch((getUser(row.ID)))
                                                  navigate("/user/" + row.ID)
                                               }
                                              }><CreateIcon style={{ color: "red", marginRight:'7px' }} /> {intlLabel("Edit")}</MenuItem>
                        </Menu>   
                </TableCell>
                <TableCell align="left" >
                  {row.ID}
                </TableCell>
                <TableCell align="left" >
                  {row.employeeID}
                </TableCell>
                <TableCell align="left" >
                {row.firstName}
                </TableCell>
                <TableCell align="left" >
                {row.lastName}
                </TableCell>
                <TableCell align="left" >
                {row.email}
                </TableCell>
                <TableCell align="left" >
                {row.phone}
                </TableCell>
                <TableCell align="left" >
                {row.organizationCode}
                </TableCell>
                <TableCell align="left" >
                {row.role}
                </TableCell>
                <TableCell align="left" >
                {row.locationCode}
                </TableCell>
                <TableCell align="left" >
                { dayjs(row.startDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="center" >
      
      <KeyIcon style={{ color: "blue" }} onClick={handlePopoverClick}/>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography style={{ padding: "2px" }}>{row.password}</Typography>
      </Popover>         
                </TableCell>
            </TableRow>
    
  )
}

export default ListItem
