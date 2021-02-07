import {
  ADMIN_GET_USER,
  ADMIN_GET_USER_FAIL,
  ORDER_DETAILS,
  STRIPE_CHARGE_RETRIEVED,
} from "../types";

const INITIAL_STATE = {
  user: {
    orders: [],
  },
  stripeUser: {},
  orderDetails: [],
  stripeOrder: {},
};

const adminReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_GET_USER:
      return {
        ...state,
        user: payload.user,
        stripeUser: payload.stripeUser,
      };

    case ADMIN_GET_USER_FAIL:
      return INITIAL_STATE;

    case ORDER_DETAILS:
      return {
        ...state,
        orderDetails: payload,
      };

    case STRIPE_CHARGE_RETRIEVED:
      return {
        ...state,
        stripeOrder: payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
