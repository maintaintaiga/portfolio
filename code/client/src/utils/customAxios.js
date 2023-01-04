import axios from "axios";

let baseUrl = process.env.REACT_APP_BASE_URL;

const config = {
  baseURL: baseUrl,
};

const ApiAxios = axios.create(config);

export { ApiAxios };
