// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:4000/api/",
//   withCredentials: true
// });



import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});



