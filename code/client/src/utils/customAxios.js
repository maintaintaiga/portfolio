import axios from "axios";

let baseUrl = process.env.REACT_APP_BASE_URL;

const config = {
  baseURL: baseUrl,
  useCredentials: true,
};

const ApiAxios = axios.create(config);

ApiAxios.interceptors.request.use(
  (config) => {
    let cookieArray = document.cookie.split(";");
    let cookieIndex = cookieArray.findIndex(
      (i) => i.indexOf(process.env.REACT_APP_CSRF_TOKEN_COOKIE_NAME) !== -1
    );
    let myCookie = cookieIndex >= 0 ? cookieArray[cookieIndex] : null;
    if (myCookie && config.method !== "get") {
      config.headers["csrf-token"] = myCookie.split("=")[1];
    }
    return config;
  },
  (error) => new Promise.reject(error)
);

export { ApiAxios };
