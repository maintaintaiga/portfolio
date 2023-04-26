import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const config = {
  baseURL: baseUrl,
  withCredentials: true,
};

const ApiAxios = axios.create(config);

ApiAxios.interceptors.request.use(
  (config) => {
    const cookieArray = document.cookie.split(";");
    const cookieName = process.env.REACT_APP_CSRF_TOKEN_COOKIE_NAME;
    const cookieIndex = cookieArray.findIndex(
      (i) => i.indexOf(cookieName ?? "") !== -1
    );
    const myCookie = cookieIndex >= 0 ? cookieArray[cookieIndex] : null;
    if (myCookie && config.method !== "get") {
      config.headers["csrf-token"] = myCookie.split("=")[1];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { ApiAxios };
