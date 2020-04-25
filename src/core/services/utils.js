import { restConnector } from "./axios";
import { parseISO, formatDistanceToNow } from "date-fns";
import vietnamese from "date-fns/locale/vi";

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

// capitalize first letter each word
export const capitalizeFirstLetterEachWord = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (var i in splitStr) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

// get the first letter of the any index string item
export const getFirstLetter = (str, isInverse, index) => {
  const strSplitted = str.split(" ");
  if (isInverse) {
    return strSplitted[strSplitted.length - (1 + index)].slice(0, 1);
  }
  return strSplitted[index].slice(0, 1);
};

export const formatDistance = (UTC) => {
  const formated = formatDistanceToNow(parseISO(UTC), { locale: vietnamese });
  return formated.charAt(0).toUpperCase() + formated.slice(1);
};