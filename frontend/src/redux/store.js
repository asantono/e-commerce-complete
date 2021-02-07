import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import ReduxThunk from "redux-thunk";

const middleware = [ReduxThunk];
const options = { trace: true };
const composeEnhancers = composeWithDevTools(options);
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
