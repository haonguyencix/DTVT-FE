import { restConnector } from "./axios";

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

// string shortcut
export const stringShortcut = (str, limit) => {
  if (str.length > limit) {
    return str.substr(0, limit) + "...";
  }
  return str;
};

// get the first letter of the any index string item
export const getFirstLetter = (str, isInverse, index) => {
  const strSplitted = str.split(" ");
  if (isInverse) {
    return strSplitted[strSplitted.length - (1 + index)].slice(0, 1);
  }
  return strSplitted[index].slice(0, 1);
};
