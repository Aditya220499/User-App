import axios from "axios";

export default axios.create({
  baseURL: "/api",
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});
