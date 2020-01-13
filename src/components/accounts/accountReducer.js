import { FETCH_USERLOGIN } from "./accountConst";

let initialState = {
  userLogin: null,
  isLoading: false
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERLOGIN["REQUEST"]: {
      return {
        ...state,
        isLoading: true
      };
    }

    case FETCH_USERLOGIN["SUCCESS"]: {
      return {
        ...state,
        userLogin: action.payload.user,
        isLoading: false
      };
    }

    case FETCH_USERLOGIN["FAILURE"]: {
      return {
        ...state,
        isLoading: false
      };
    }

    default:
      return state;
  }
};

export default AccountReducer;
