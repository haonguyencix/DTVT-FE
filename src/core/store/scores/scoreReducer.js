import { FETCH_SCORE_LIST, UPDATE_FOUR_SCORE_IN_LIST, ADJUST_TOGGLE_C, RESET_SCORES_DEFAULT, SET_IS_RESET } from "./scoreType";

let initialState = {
  defaultValue: [],
  scoresDisplay: {},
  scoresReal: [],
  toggleC: false,
  isReset: false
};

const ScoreReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SCORE_LIST:

      const caclPercent = (v) => v / 100;

      const calcFour = (average = 0) => {
        if (average < 4) return 0;
        if (average >= 4 && average <= 5.4) return 1;
        if (average >= 5.5 && average <= 6.9) return 2;
        if (average >= 7 && average <= 8.4) return 3;
        if (average >= 8.5 && average <= 10) return 4;
        return 0;
      };

      let scoresDisplayClone = { ...state.scoresDisplayClone };

      const defaultValue = payload === RESET_SCORES_DEFAULT ? state.defaultValue : payload;

      const mappingScores = defaultValue.map((item) => {
        const row = { ...item }; delete row.classroomId;
    
        row.average = parseFloat(row.midScore * caclPercent(100 - row.endPercent)) + row.endScore * caclPercent(row.endPercent);
        row.four = calcFour(row.average);
        row.status = row.four === 0 ? "fail" : row.four === 1 ? "warning" : "success";
        
        const id = item.classroomId.substring(item.classroomId.length - 5);
    
        scoresDisplayClone[id] ? scoresDisplayClone[id].push(row) : (scoresDisplayClone[id] = row.id ? [row] : []);
    
        return { id, subjectId: row.subjectId, credits: row.four ? row.credits : 0, status: row.status, four: parseInt(row.four * row.credits) }; 
      });

      const scoresReal = mappingScores.filter((v, i, a) => a.findIndex(t => (t.subjectId === v.subjectId) ) === i);
      
      return { ...state, defaultValue, scoresDisplay: scoresDisplayClone, scoresReal };

    case UPDATE_FOUR_SCORE_IN_LIST:
      const index = state.scoresReal.findIndex(item => item.subjectId === payload.subjectId);
      state.scoresReal[index].four = payload.fourValue;

      return { ...state, scoresReal: [...state.scoresReal] }

    case ADJUST_TOGGLE_C:
      return { ...state, toggleC: payload }

    case SET_IS_RESET:
      return { ...state, isReset: payload }

    default:
      return state;
  }
};

export default ScoreReducer;
