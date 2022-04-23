import axiosRequest from "./request";
import localCache from "@/utils/cache";
const httpRequest = new axiosRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: Number(process.env.VUE_TIME_OUT),
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache("token");
      if (token) {
        config.headers = {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (error) => {
      return error;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (error) => {
      return error;
    },
  },
});

export default httpRequest;
