import {
  GET_USER,
  LOGOUT,
  CHECK_USER_FAIL,
  ADD_CARDS_TO_USER,
  SET_CARD,
  SET_USER_COURSE,
  CREATED_COURSES_RETRIEVED,
  HASH,
} from "../types";

const INITIAL_STATE = {
  user: {
    clearance: "",
    email: "",
    _id: "",
    stripeId: "",
    coursesCreated: [],
    coursesOwned: [],
  },
  cards: [],
  cardToUse: {},
  checkUser: true,
  userCourse: {
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
    img: { url: "", deleteKey: "" },
  },
  hash: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        checkUser: false,
      };
    case LOGOUT:
      return INITIAL_STATE;

    case CHECK_USER_FAIL:
      return {
        ...state,
        checkUser: false,
      };

    case ADD_CARDS_TO_USER:
      return {
        ...state,
        cards: payload,
      };
    case SET_CARD:
      return {
        ...state,
        cardToUse: payload,
      };
    case SET_USER_COURSE:
      return {
        ...state,
        userCourse: payload,
      };

    case CREATED_COURSES_RETRIEVED:
      return {
        ...state,
        user: { ...state.user, coursesCreated: payload },
      };
    case HASH:
      return {
        ...state,
        hash: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
