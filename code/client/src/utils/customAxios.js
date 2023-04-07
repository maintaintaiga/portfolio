import axios from "axios";

let baseUrl = process.env.REACT_APP_BASE_URL;

const config = {
  baseURL: baseUrl,
  withCredentials: true,
};

const ApiAxios = axios.create(config);

ApiAxios.interceptors.request.use(
  (config) => {
    let cookieArray = document.cookie.split(";");
    console.log("document.cookie: ", document.cookie);
    let cookieIndex = cookieArray.findIndex(
      (i) => i.indexOf(process.env.REACT_APP_CSRF_TOKEN_COOKIE_NAME) !== -1
    );
    console.log("cookie index: ", cookieIndex);
    let myCookie = cookieIndex >= 0 ? cookieArray[cookieIndex] : null;
    console.log("my cookie/method: ", myCookie, config.method);
    if (myCookie && config.method !== "get") {
      console.log("setting header");
      config.headers["csrf-token"] = myCookie.split("=")[1];
    }
    return config;
  },
  (error) => new Promise.reject(error)
);

export { ApiAxios };
