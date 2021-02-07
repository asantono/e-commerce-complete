import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import alertReducer from "./reducers/alertReducer";
import cartReducer from "./reducers/cartReducer";
import courseReducer from "./reducers/courseReducer";
import adminReducer from "./reducers/adminReducer";
import loadReducer from "./reducers/loadReducer";

const rootReducer = combineReducers({
  userReducer,
  alertReducer,
  cartReducer,
  courseReducer,
  adminReducer,
  loadReducer,
});

export default rootReducer;
