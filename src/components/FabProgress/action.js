import { CHECK_LOADING } from "./const";

// action creator
export const actCheckLoading = status => ({
  type: CHECK_LOADING[status]
});
