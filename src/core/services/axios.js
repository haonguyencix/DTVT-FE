import Axios from "axios";

export const _baseURL = process.env.REACT_APP_BASE_URL;
export const _domain = "http://localhost:3000"

export const restConnector = Axios.create({baseURL: _baseURL + "api/"})
