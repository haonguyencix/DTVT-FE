import socketIOClient from "socket.io-client";
import { _baseURL } from "./axios";

export default socket = socketIOClient(_baseURL);