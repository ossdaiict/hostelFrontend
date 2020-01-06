import axios from "axios";
import setAuthToken from "../../Utils/SetAuthToken";
import { toast } from "react-toastify";
import { SET_CURRENT_USER, LOADING_USER, LOGOUT_USER } from "../type";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/auth/signup", userData)
    .then(res => {
      toast.info(`${res.data.message}`);
      history.push("/login");
    })
    .catch(err => {
      if (typeof err.response !== undefined) {
        toast.error(`Unable to register!..`);
      } else {
        toast.error(`${err.response.data.message}`);
      }
    });
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

      toast.info(`${res.data.message}`);
    })
    .catch(err => {
      if (typeof err.response !== undefined) {
        toast.error(`Unable to login!..`);
      } else {
        toast.error(`${err.response.data.message}`);
      }
    });
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
