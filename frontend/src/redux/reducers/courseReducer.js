import {
  COURSES_RETRIEVED,
  COURSE_CREATED,
  SET_COURSE_DATA,
  SALE_OPT_IN,
  SET_COURSE_FEATURES,
  EDIT_COURSE_DATA,
  RESET_COURSE_DATA,
  SALE,
  COURSE_SALE,
  COURSE_SEARCH,
  MORE_COURSES_RETRIEVED,
  SEND_IMAGE_FALSE,
} from "../types";

const INITIAL_STATE = {
  courses: [],
  sendImage: false,
  coursesCreated: [],
  sale: 1.0,
  searchedCourses: [],

  courseData: {
    title: "",
    author: "",
    price: "",
    saleOptIn: false,
    length: "",
    accessType: "lifetime access",
    certification: "",
    tagline: "",
    adText: "",
    features: ["", "", "", "", "", ""],
    _id: "",
  },
};

const courseReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case COURSES_RETRIEVED:
      return {
        ...state,
        courses: payload,
      };
    case MORE_COURSES_RETRIEVED:
      return {
        ...state,
        courses: [...state.courses, ...payload],
      };

    case SET_COURSE_DATA:
      return {
        ...state,
        courseData: {
          ...state.courseData,
          [payload.name]: payload.value,
        },
      };

    case SET_COURSE_FEATURES:
      const num = parseInt(payload.name);
      let updateFeat = [...state.courseData.features];
      updateFeat[num] = payload.value;

      return {
        ...state,
        courseData: {
          ...state.courseData,
          features: updateFeat,
        },
      };

    case SALE_OPT_IN:
      return {
        ...state,
        courseData: {
          ...state.courseData,
          saleOptIn: payload,
        },
      };

    case COURSE_CREATED:
      return {
        ...state,
        coursesCreated: payload || [],
        sendImage: true,
      };

    case EDIT_COURSE_DATA:
      return {
        ...state,
        courseData: payload,
      };

    case RESET_COURSE_DATA:
      return {
        ...state,
        courseData: INITIAL_STATE.courseData,
      };

    case SEND_IMAGE_FALSE:
      return {
        ...state,
        sendImage: false,
      };

    case SALE:
      return {
        ...state,
        sale: payload,
      };

    case COURSE_SALE:
      return {
        ...state,
        sale: payload,
      };
    case COURSE_SEARCH:
      return {
        ...state,
        searchedCourses: payload,
      };

    default:
      return state;
  }
};

export default courseReducer;
