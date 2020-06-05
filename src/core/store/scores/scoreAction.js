import { toast } from "react-toastify";
import { FETCH_SCORE_LIST, UPDATE_FOUR_SCORE_IN_LIST, ADJUST_TOGGLE_C, RESET_SCORES_DEFAULT, SET_IS_RESET } from "./scoreType";
import ScoreService from "./scoreService";

// async action
export const getScores = () => {
  return (dispatch) => {
    ScoreService.getScores()
      .then((res) => {
        dispatch(actFetchScoreList(res.data));
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };
};

// action creator
export const actFetchScoreList = (scores) => ({
  type: FETCH_SCORE_LIST,
  payload: scores,
});

export const actUpdateFourInList = (subjectId, fourValue) => ({
  type: UPDATE_FOUR_SCORE_IN_LIST,
  payload: { subjectId, fourValue }
});

export const actAdjustToggleC = (status) => ({
  type: ADJUST_TOGGLE_C,
  payload: status
})

export const actResetScoresDefault = () => ({
  type: FETCH_SCORE_LIST,
  payload: RESET_SCORES_DEFAULT
})

export const actSetReset = (status) => ({
  type: SET_IS_RESET,
  payload: status
})