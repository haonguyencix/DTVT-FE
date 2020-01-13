import Axios from "axios";

const _baseURL = process.env.REACT_APP_BASE_URL;

export const restConnector = Axios.create({baseURL: _baseURL})
