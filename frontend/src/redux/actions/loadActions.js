//import uuid from "uuid";
import { LOADING, STOP_LOADING } from "../types";

export const loading = (id) => (dispatch) => {
  //   !id ? (id = uuid.v4()) : (id = id);
  dispatch({
    type: LOADING,
    payload: id,
  });
};

export const stopLoading = () => (dispatch) => {
  dispatch({
    type: STOP_LOADING,
  });
};
