import { toast } from "react-toastify";
import { FETCH_SCORE_LIST, UPDATE_FOUR_SCORE } from "./scoreType";
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

export const actUpdateFour = (subjectId, fourValue) => ({
  type: UPDATE_FOUR_SCORE,
  payload: { subjectId, fourValue }
})