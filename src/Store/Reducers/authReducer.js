import { SET_CURRENT_USER, LOADING_USER, LOGOUT_USER } from "../type";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}
