import axios from "axios";

console.log(process.env.NODE_ENV);
let url = "https://e-commerce-papa-santo.herokuapp.com/api/v1";
if (process.env.NODE_ENV === "development")
  url = "http://localhost:5000/api/v1";

export default axios.create({
  baseURL: url,
  withCredentials: true,
  credentials: "include",
});
