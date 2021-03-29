import axios from "axios";
import interceptors from "./interceptors";

const instanse = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  params: {
    apikey: process.env.VUE_APP_API_KEY,
    plot: "full",
  }
});

interceptors(instanse);

export default instanse;