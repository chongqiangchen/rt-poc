import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error("Network/Server error");
    } else {
      console.error(
        `Error ${error.response.status}: ${error.response.statusText}`
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
