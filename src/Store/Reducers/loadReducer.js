import { DATA_LOADED, DATA_LOADING } from "../type";

const initialState = {
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case DATA_LOADED:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
