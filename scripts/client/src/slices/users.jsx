import { createSlice } from "@reduxjs/toolkit";
import {
  getUserRecord,
  getAllUserRecords,
  getUserFilteredList,
  putEditUserRecord,
  patchChangeUserPassword,
  postCreateUserRecord,
  deleteUserRecord,
} from "../services/userService";

const UserSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    userData: [],
    filter: "",
    mode: "",
    msg: {},
  },

  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    getUserDetail(state, action) {
      state.userData = action.payload;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    setMessage(state, action) {
      state.msg = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await getAllUserRecords();
    dispatch(setData(response.data));
    return;
  } catch (error) {
    if (error.message === "DatabaseError") {
      dispatch(setData([]));
      dispatch(
        setMessage({ text: "Unable to connect to the Database", code: "red" })
      );
    } else if (error.message === "ApiError") {
      dispatch(setData({}));
      dispatch(
        setMessage({ text: "Unable to connect to the Web Server", code: "red" })
      );
    }
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const response = await getUserRecord(id);
    dispatch(getUserDetail(response.data.userRecord));
    dispatch(setMessage({}));
    return;
  } catch (error) {
    if (error.message === "DatabaseError") {
      dispatch(setData([]));
      dispatch(
        setMessage({ text: "Unable to connect to the Database", code: "red" })
      );
    } else if (error.message === "ApiError") {
      dispatch(setData([]));
      dispatch(
        setMessage({ text: "Unable to connect to the Web Server", code: "red" })
      );
    }
  }
};

export const getFilterList = (filterValue) => async (dispatch) => {
  try {
    const response = await getUserFilteredList(filterValue);
    dispatch(setFilter(filterValue));
    dispatch(setData(response.data));  
    dispatch(setMessage({ text: response.data.message, code: "blue" }));
    return;
  } catch (error) {
    if (error.message === "DatabaseError") {
      dispatch(setData([]));
      dispatch(
        setMessage({ text: "Unable to connect to the Database", code: "red" })
      );
    } else if (error.message === "ApiError") {
      dispatch(setData([]));
      dispatch(
        setMessage({ text: "Unable to connect to the Web Server", code: "red" })
      );
    }
  }
};

export const putEditRecord = (id, data) => async (dispatch) => {
  try {
    const response = await putEditUserRecord(id, data);
    dispatch(getUserDetail(response.data.userRecord));
    dispatch(setMessage({ text: response.data.message, code: "blue" }));
    return;
  } catch (error) {
    if (error.message === "DatabaseError") {
      dispatch(
        setMessage({ text: "Unable to connect to the Database", code: "red" })
      );
    } else if (error.message === "DuplicateRecord") {
      dispatch(setMessage({ text: "Duplicate Record Found", code: "blue" }));
    } else if (error.message === "ApiError") {
      dispatch(
        setMessage({ text: "Unable to connect to the Web Server", code: "red" })
      );
    }
  }
};

export const patchChangePassword = (id, data) => async (dispatch) => {
  try {
    const response = await patchChangeUserPassword(id, data);
    if (response.data.message === "Password Updated successfully") {
      dispatch(getUserDetail(response.data.userRecord));
    }
    dispatch(setMessage({ text: response.data.message, code: "blue" }));
    return;
  } catch (error) {
    if (error.message === "DatabaseError") {
      dispatch(
        setMessage({ text: "Unable to connect to the Database", code: "red" })
      );
    } else if (error.message === "ApiError") {
      dispatch(
        setMessage({ text: "Unable to connect to the Web Server", code: "red" })
      );
    }
  }
};

export const postCreateRecord = (data) => async (dispatch) => {
  try {
    const response = await postCreateUserRecord(data);
    dispatch(getUserDetail(response.data.userRecord));
    dispatch(setMessage({ text: response.data.message, code: "blue" }));
    if (response.data.message === "User Record Created successfully") {
      dispatch(setMode("Edit"));
    }
    return;
  } catch (error) {
    if (error.message === "DatabaseError") {
      dispatch(
        setMessage({ text: "Unable to connect to the Database", code: "red" })
      );
    } else if (error.message === "ApiError") {
      dispatch(
        setMessage({ text: "Unable to connect to the Web Server", code: "red" })
        );
    } else if (error.message === "DuplicateRecord") {
        dispatch(setMessage({ text: "Duplicate Record Found", code: "blue" }));
    }
  }
};

export const deleteRecord = (id) => async (dispatch) => {
  try {
    const response = await deleteUserRecord(id);
    dispatch(getUserDetail(response.data.userRecord));
    dispatch(setMessage({ text: response.data.message, code: "blue" }));
    return;
  } catch (error) {
    if (error.message === "DatabaseError") {
      dispatch(getUserDetail([]));
      dispatch(
        setMessage({ text: "Unable to connect to the Database", code: "red" })
      );
    } else if (error.message === "ApiError") {
      dispatch(getUserDetail([]));
      dispatch(
        setMessage({ text: "Unable to connect to the Web Server", code: "red" })
      );
    }
  }
};

export const clearMessage = () => async (dispatch) => {
  dispatch(setMessage(""));
};

export const {
  setData,
  setMode,
  getUserDetail,
  setMessage,
  setStatusCode,
  setFilter,
} = UserSlice.actions;
const { reducer } = UserSlice;
export default reducer;
