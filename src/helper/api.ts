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
    const status = error.response?.status;
    const responseData = error.response?.data || {};
    const message = responseData?.message || error.message;
    const hasAccessToken = !!getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    console.error(message, "API Error");
    if (
      status === 401 &&
      typeof window !== "undefined" &&
      (hasAccessToken ||
        responseData?.force_logout ||
        message === "Your account has been deactivated by admin.")
    ) {
      window.dispatchEvent(
        new CustomEvent("force-logout", {
          detail: {
            message:
              responseData?.message ||
              "Your account has been deactivated by admin.",
          },
        })
      );
    }

    return Promise.reject(error);
  }
);
