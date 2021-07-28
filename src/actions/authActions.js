import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
// import jwt from "jwt-decode";
import jwt from "jwt-simple";
import {
  GET_ERRORS,
  GET_SUCCESS,
  SET_CURRENT_USER,
  USER_LOADING,
} from "./types";
import constants from "./../constants";

export const loginUser = (userData) => (dispatch) => {
  console.log('req data',userData)
  axios
    .post(constants.baseUrl + "/api/auth/signin", userData)
    .then((res) => {
      console.log('resp',res)
      //const { token } = res.data;
      const secret = "FxUum76z";
      const currentTime = Date.now() / 1000;
      const payload = {
        id: res.data.id,
        email: res.data.email,
        username: res.data.username,
        token: res.data.accessToken,
        expires: currentTime + 604800,
      };
      // encode
      const token = jwt.encode(payload, secret);

      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      //const decoded = jwt_decode(token);

      // decode
      const decoded = jwt.decode(token, secret);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log('err',err)
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};

export const forgotUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/v1/users/forgot", userData)
    .then((res) => {
      dispatch({
        type: GET_SUCCESS,
        payload: res,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const resetUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/v1/users/reset", userData)
    .then((res) => {
      dispatch({
        type: GET_SUCCESS,
        payload: res,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
                                                                                                                                                                                                                                            
export const setUserLoading = () => {
  return {
    type: USER_LOADING,                                                                                                                                                                                                                                                                                                                                                                                                
  };
};

export const logoutUser = (logoutData) => (dispatch) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  //localStorage.removeItem("jwtToken");
  localStorage.clear();
  setAuthToken(false);
  dispatch(setCurrentUser({}));
//   let config = {
//     method:'DELETE',
//     url: constants.baseUrl + '/api/v1/users/logout',
//     data: logoutData,
//     headers:{
//         Authorization: "Bearer " + logoutData.token, Accept : 'application/json', 'Content-Type': 'application/json'
//     }
// }
// axios(config).then(
//   success=>{
//       console.log("SUCCESSfully logout")
//       dispatch({
//                   type: GET_SUCCESS,
//                   payload: success,
//       })
//   },
//   error=>{
//       console.log("ERROR")
//       dispatch({
//                   type: GET_ERRORS,
//                   payload: error.response.data
//               })
//           }
//   );
};
