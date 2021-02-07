import { LOADING, STOP_LOADING } from "../types";

const INITIAL_STATE = { loading: [] };

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      if (state.loading.includes(payload)) {
        return {
          ...state,
          loading: state.loading.filter((el) => el !== payload),
        };
      } else
        return {
          ...state,
          loading: [...state.loading, payload],
        };
    case STOP_LOADING:
      return {
        ...state,
        loading: [],
      };

    default:
      return state;
  }
}
