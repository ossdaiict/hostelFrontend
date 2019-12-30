import axios from "axios";
import setAuthToken from "../../Utils/SetAuthToken";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  LOADING_USER,
  LOGOUT_USER
} from "../type";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/auth/signup", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = (userData, history, from) => dispatch => {
  dispatch({
    type: LOADING_USER
  });
  axios
    .post("http://localhost:5000/auth/signin", userData)
    .then(res => {
      // Save to localStorage
      const { token, user } = res.data;

      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);

      dispatch(setCurrentUser(user));

      history.replace(from);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  dispatch({
    type: LOADING_USER
  });
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch({
    type: LOGOUT_USER
  });
};
