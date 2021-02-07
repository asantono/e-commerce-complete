import uuid from "uuid/v4";
import {
  GET_USER,
  LOGOUT,
  CHECK_USER_FAIL,
  SET_CARD,
  SET_USER_COURSE,
  HASH,
} from "../types";
import API from "../../util/API";
import { setAlert } from "./alertActions";
import { addCardsToUser } from "./stripeActions";
import { loading } from "./loadActions";

const options = { headers: { "Content-Type": "application/json" } };

export const signupAction = (email, password) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));

  const body = { email, password };
  const url = "/auth/signup";
  try {
    const res = await API.post(url, body, options);
    dispatch({ type: GET_USER, payload: res.data.user });
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};

export const loginAction = (email, password) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  const body = { email, password };
  const url = "/auth/login";
  try {
    const res = await API.post(url, body, options);
    dispatch({ type: GET_USER, payload: res.data.user });
    if (res.data.user.stripeId)
      await dispatch(addCardsToUser(res.data.user.stripeId));
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};

export const logoutAction = () => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  const url = "/auth/logout";
  try {
    await API.get(url);
    dispatch({ type: LOGOUT });
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};

export const checkUserAction = () => async (dispatch) => {
  const url = "/auth/checkuser";
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    let res = await API.get(url);
    dispatch({ type: GET_USER, payload: res.data.user });
    if (res.data.user.stripeId) {
      await dispatch(addCardsToUser(res.data.user.stripeId));
    }
  } catch (err) {
    dispatch({ type: CHECK_USER_FAIL });
  }
  dispatch(loading(loadId));
};

export const setCard = (card) => {
  return { type: SET_CARD, payload: card };
};

export const setUserCourse = (course) => {
  return { type: SET_USER_COURSE, payload: course };
};

export const forgotPassword = (email) => async (dispatch) => {
  const url = "/auth/forgotpassword";
  const body = { email };
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    await API.post(url, body, options);
    dispatch(setAlert("Password Reset Email Sent"));
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};

export const passwordReset = (password, hash) => async (dispatch) => {
  const url = `/auth/passwordreset`;
  const body = { password, hash };
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    await API.post(url, body, options);
    dispatch(setAlert("Success"));
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};

export const getHash = (hash) => {
  return { type: HASH, payload: hash };
};
