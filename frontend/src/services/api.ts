import axios from "axios";

const API = axios.create({
  baseURL: "https://bookit-1-afwz.onrender.com", // change to your deployed backend later
});

export default API;
