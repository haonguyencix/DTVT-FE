import { restConnector } from "../connector/axios";

// async call API
export const asyncCall = timer => {
  return new Promise(resolve => setTimeout(() => resolve(), timer));
};

// set localstorage
export const setLocalStorage = (key, attr) => {
  return localStorage.setItem(key, JSON.stringify(attr));
};

// get localstorage
export const getLocalStorage = key => {
  if (!localStorage.getItem(key)) {
    return null;
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};

// send authorization (accessToken)
export const sendAccessToken = accessToken => {
  return (restConnector.defaults.headers[
    "Authorization"
  ] = `Bearer ${accessToken}`);
};