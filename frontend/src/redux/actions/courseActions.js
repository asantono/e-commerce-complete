import uuid from "uuid/v4";
import { setAlert } from "./alertActions";
import API from "../../util/API";
import {
  COURSES_RETRIEVED,
  COURSE_CREATED,
  SEND_IMAGE_FALSE,
  SET_COURSE_DATA,
  SALE_OPT_IN,
  SET_COURSE_FEATURES,
  CREATED_COURSES_RETRIEVED,
  EDIT_COURSE_DATA,
  RESET_COURSE_DATA,
  COURSE_SALE,
  COURSE_SEARCH,
  MORE_COURSES_RETRIEVED,
} from "../types";
import { checkUserAction } from "./userActions";
import { loading } from "./loadActions";

const options = { headers: { "Content-Type": "application/json" } };

export const getSale = () => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    const url = "/course/sale";
    let res = await API.get(url);
    dispatch({ type: COURSE_SALE, payload: res.data.sale.sale });
  } catch (err) {
    console.log(err);
  }
  dispatch(loading(loadId));
};

export const getAllCourses = () => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    const url = "/course/allcourses";
    let res = await API.get(url);
    dispatch({ type: COURSES_RETRIEVED, payload: res.data.course });
    dispatch(getSale());
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
    console.log(err);
  }
  dispatch(loading(loadId));
};

export const loadMoreCourses = (pageNum) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  if (pageNum === 0) dispatch({ type: COURSES_RETRIEVED, payload: [] });
  try {
    const url = "/course/morecourses";
    const limit = 2;
    const body = { pageNum, limit };
    let res = await API.post(url, body, options);

    if (!res.data.course.length) {
      dispatch(setAlert("There are no more courses to load"));
    }

    dispatch({ type: MORE_COURSES_RETRIEVED, payload: res.data.course });
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
    console.log(err);
  }
  dispatch(loading(loadId));
};

export const searchCourses = (query) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    const body = { query };
    const url = "/course/searchCourses";
    let res = await API.post(url, body, options);
    dispatch({ type: COURSE_SEARCH, payload: res.data.course });
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
    console.log(err);
  }
  dispatch(loading(loadId));
};

export const clearSearchCourses = () => {
  return { type: COURSE_SEARCH, payload: [] };
};

export const getMyCourses = () => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  try {
    const url = "/course/createdCourses";
    let res = await API.get(url);
    dispatch({ type: CREATED_COURSES_RETRIEVED, payload: res.data.course });
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
    console.log(err);
  }
  dispatch(loading(loadId));
};

export const setCourseData = (name, value) => {
  return { type: SET_COURSE_DATA, payload: { name, value } };
};

export const setCourseFeatures = (name, value) => {
  return { type: SET_COURSE_FEATURES, payload: { name, value } };
};

export const setCourseRadio = (radioVal) => {
  return { type: SALE_OPT_IN, payload: radioVal };
};

export const editCourseData = (data) => {
  return { type: EDIT_COURSE_DATA, payload: data };
};

export const resetCourseData = () => {
  return { type: RESET_COURSE_DATA };
};

export const sendCourseData = (data, edit) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  const body = data;
  try {
    let url = edit.edit ? "/course/editCourse" : "/course/createCourse";
    let res = await API.post(url, body, options);
    dispatch({ type: COURSE_CREATED, payload: res.data.newCourse });
    dispatch(setAlert("Success"));
    dispatch(checkUserAction());
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
    console.log(err);
  }
  dispatch(loading(loadId));
};

export const sendCourseImage = (image, courseId) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  if (!image.length) {
    dispatch({ type: SEND_IMAGE_FALSE });
    dispatch(loading(loadId));
    return;
  }
  const imageForm = new FormData();
  imageForm.append("images", image[0]);
  const body = imageForm;
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  try {
    dispatch({ type: SEND_IMAGE_FALSE });
    const url = `/course/uploadImage/${courseId}`;
    await API.post(url, body, config);
    //dispatch({ type: IMAGE_UPLOADED, payload: res.data.img });
    dispatch(getMyCourses());
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
  }
  dispatch(loading(loadId));
};

export const deleteCourse = (_id) => async (dispatch) => {
  const loadId = uuid();
  dispatch(loading(loadId));
  const body = { _id };
  try {
    let url = "/course/deleteCourse";
    await API.post(url, body, options);
    dispatch(setAlert("Course Deleted"));
    dispatch(checkUserAction());
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
    console.log(err);
  }
  dispatch(loading(loadId));
};
