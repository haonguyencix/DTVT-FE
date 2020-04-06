import socketIOClient from "socket.io-client";
import { _baseURL } from "./axios";

const socket = socketIOClient(_baseURL);

export default socket;