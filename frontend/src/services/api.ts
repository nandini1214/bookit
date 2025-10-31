import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // change to your deployed backend later
});

export default API;
