import http from "../http-common";

export const getAllUserRecords = async () => {
  let response;
  try {
    response = await http.get(`/user`, {timeout: 1000 * 10});
  } catch (error) {
    if (error.response && error.response.data.statuscode === 500) {
      throw new Error("DatabaseError");
    } else {
      throw new Error("ApiError");
    }
  }
  return response;
};

export const getUserRecord = async (id) => {
  let response = await http.get(`/user/${id}`, {timeout: 1000 * 10});
  return response;
};

export const getUserFilteredList = async (filterValue) => {
  let response;
  try {
    response = await http.get(`/user/filter?filterBy=${filterValue}`);
  } catch (error) {
    if (error.response && error.response.data.statuscode === 500) {
      throw new Error("DatabaseError");
    } else {
      throw new Error("ApiError");
    }
  }
  return response;
};

export const putEditUserRecord = async (id, data) => {
  let response;
  try {
    response = await http.put(`/user/${id}`, data);
  } catch (error) {
    if (error.response && error.response.data.statuscode === 500) {
      throw new Error("DatabaseError");
    } else if (
      error.response &&
      error.response.data.message === "Duplicate Record Found"
    ) {
      throw new Error("DuplicateRecord");
    } else {
      throw new Error("ApiError");
    }
  }
  return response;
};

export const patchChangeUserPassword = async (id, data) => {
  let response;
  try {
    response = await http.patch(`/user/${id}`, data);
  } catch (error) {
    if (error.response && error.response.data.statuscode === 500) {
      throw new Error("DatabaseError");
    } else {
      throw new Error("ApiError");
    }
  }
  return response;
};

export const postCreateUserRecord = async (data) => {
  let response;
  try {
    response = await http.post(`/user`, data);
  } catch (error) {
    if (error.response && error.response.data.statuscode === 500) {
      throw new Error("DatabaseError");
    } else if (
      error.response &&
      error.response.data.message === "Duplicate Record Found"
    ) {
      throw new Error("DuplicateRecord");
    } else {
      throw new Error("ApiError");
    }
  }
  return response;
};

export const deleteUserRecord = async (id) => {
  let response;
  try {
    response = await http.delete(`/user/${id}`);
  } catch (error) {
    if (error.response && error.response.data.statuscode === 500) {
      throw new Error("DatabaseError");
    } else {
      throw new Error("ApiError");
    }
  }
  return response;
};
