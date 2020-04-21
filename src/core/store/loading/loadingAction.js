import { CHECK_FAB_PROGRESS } from "./loadingType";

// action creator
export const actCheckFabProgress = status => ({
  type: CHECK_FAB_PROGRESS[status]
});
