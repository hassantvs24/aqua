import { createStore, combineReducers } from "redux";
import scroll3DReducer from "./scroll3DReducer";
import modalReducer from "./modal/modal-reducer";

const rootReducer = combineReducers({
  scroll3DEntry: scroll3DReducer,
  modalState: modalReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
