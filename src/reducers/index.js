import { combineReducers } from "redux";
import authReducer from "./authReducers";
import apiResReducer from "./apiResReducers";
export default combineReducers({
    auth: authReducer,
    apiRes: apiResReducer
});