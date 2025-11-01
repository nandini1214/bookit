// src/services/api.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)
const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, private",
    Pragma: "no-cache",
    Expires: "0",
  },
});
console.log(API)
// Optional: Prevent caching by adding timestamp to GET URLs
API.interceptors.request.use((config) => {
  if (config.method?.toLowerCase() === "get") {
    const ts = new Date().getTime();
    config.url = `${config.url}${config.url?.includes("?") ? "&" : "?"}_=${ts}`;
  }
  return config;
});

export default API;
