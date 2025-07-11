import Axios, { InternalAxiosRequestConfig } from "axios";
import { getItem } from "./cookieStorage";
import { LOCAL_STORAGE_KEY } from "@/constants";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  const accessToken = getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Token ${accessToken}`;
  }
  return config;
}

export const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error(message, "API Error");
    // if (error.response?.status === 401) {
    //   if (typeof window !== "undefined") {
    //     const searchParams = new URLSearchParams();
    //     const redirectTo = searchParams.get("redirectTo");
    //     if (redirectTo) {
    //       window.location.href = `/auth/login?redirectTo=${redirectTo}`;
    //     } else {
    //       window.location.href = "/auth/login";
    //     }
    //   }
    // }

    return Promise.reject(error);
  }
);
