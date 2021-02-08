import axios from "axios";

export default axios.create({
  baseURL: "https://e-commerce-papa-santo.herokuapp.com/api/v1",
  withCredentials: true,
  credentials: "include",
});
