import uuid from "uuid/v4";
import { setAlert } from "./alertActions";
import API from "../../util/API";
import {
  CHARGE_COMPLETE,
  ADD_CARDS_TO_USER,
  STRIPE_CHARGE_RETRIEVED,
} from "../types";
import { checkUserAction } from "./userActions";
import { loading } from "./loadActions";

export const addCardsToUser = (stripeId) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  const options = { headers: { "Content-Type": "application/json" } };
  const url = "/stripe/addCardsToUser";
  const body = { stripeId };
  try {
    let res = await API.post(url, body, options);
    dispatch({ type: ADD_CARDS_TO_USER, payload: res.data.cards.data });
  } catch (err) {}
  dispatch(loading(loadId));
};

export const singleCharge = (token, total, description, cart) => async (
  dispatch
) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    const options = { headers: { "Content-Type": "application/json" } };
    const body = { token, total, description, cart };
    const url = "/stripe/singlecharge";
    await API.post(url, body, options);
    dispatch(checkUserAction());
    dispatch({ type: CHARGE_COMPLETE });
    dispatch(setAlert("Success"));
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
    console.log(err);
  }
  dispatch(loading(loadId));
};

export const saveCardAndCharge = (
  token,
  total,
  description,
  cart,
  stripeId
) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    const options = { headers: { "Content-Type": "application/json" } };
    const body = { token, total, description, cart };
    const url = "/stripe/savecardandcharge";
    await API.post(url, body, options);
    dispatch(checkUserAction());
    dispatch({ type: CHARGE_COMPLETE });
    dispatch(setAlert("Success"));
    await dispatch(addCardsToUser(stripeId));
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
    console.log(err);
  }
  dispatch(loading(loadId));
};

export const chargeSavedCard = (cardId, total, description, cart) => async (
  dispatch
) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    const options = { headers: { "Content-Type": "application/json" } };
    const body = { cardId, total, description, cart };
    const url = "/stripe/chargeSavedCard";
    await API.post(url, body, options);
    dispatch(checkUserAction());
    dispatch({ type: CHARGE_COMPLETE });
    dispatch(setAlert("Success"));
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
    console.log(err);
  }
  dispatch(loading(loadId));
};

export const deleteCard = (cardId, stripeId) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    const options = { headers: { "Content-Type": "application/json" } };
    const body = { cardId, stripeId };
    const url = "/stripe/deletecard";
    await API.post(url, body, options);
    dispatch(checkUserAction());
    dispatch({ type: CHARGE_COMPLETE });
    dispatch(setAlert("Deleted"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};

export const getStripeCharge = (chargeId) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  const options = { headers: { "Content-Type": "application/json" } };
  const body = { chargeId };
  const url = "/stripe/getStripeCharge";
  try {
    let res = await API.post(url, body, options);
    dispatch({ type: STRIPE_CHARGE_RETRIEVED, payload: res.data.charge });
  } catch (err) {
    console.log(err);
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};

export const refundStripeCharge = (chargeId, amount) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  const options = { headers: { "Content-Type": "application/json" } };
  const body = { chargeId, amount };
  const url = "/stripe/refundStripeCharge";
  try {
    await API.post(url, body, options);
    dispatch(setAlert("Refund Successful"));
    dispatch(getStripeCharge(chargeId));
  } catch (err) {
    console.log(err);
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};
