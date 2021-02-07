import uuid from "uuid/v4";
import {
  ADMIN_GET_USER,
  SALE,
  ORDER_DETAILS,
  ADMIN_GET_USER_FAIL,
} from "../types";
import { setAlert } from "./alertActions";
import API from "../../util/API";
import { loading } from "./loadActions";

const options = { headers: { "Content-Type": "application/json" } };

export const adminGetUser = (email) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  const body = { email };
  const url = "/admin/getuser";

  try {
    const res = await API.post(url, body, options);
    dispatch({ type: ADMIN_GET_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: ADMIN_GET_USER_FAIL });
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};

export const createSale = (sale) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  const body = { sale };
  const url = "/admin/sale";

  try {
    const res = await API.post(url, body, options);
    dispatch({ type: SALE, payload: res.data.sale });
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};

export const orderDetails = (el) => {
  return { type: ORDER_DETAILS, payload: el };
};
