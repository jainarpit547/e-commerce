import axios from "axios";
import { GET_ERRORS, GET_SUCCESS } from "./types";
import PropTypes from "prop-types";
import constants from "./../constants";

// export const listUsers = (userData) => (dispatch) => {
//   var instance = axios.create();
//   instance.defaults.headers.common = {};

//   instance
//     // .post("/api/v1/users", userData)
//     .get("/api/v1/users", {
//       headers: {
//         authorization: "Bearer " + userData.token,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) =>
//       dispatch({
//         type: GET_SUCCESS,
//         payload: res,
//       })
//     )
//     .catch((err) =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err,
//       })
//     );
// };

export const listUsers = (userData) => (dispatch) => {
 
  let config = {
    method: "GET",
    url: constants.baseUrl + "/api/user/getUsers",
    data: userData,
    headers: {
      "x-access-token" : userData.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log("CONFIG", config);
  axios(config).then(
    (success) => {
      console.log("SUCCESS",success);
      dispatch({
        type: GET_SUCCESS,
        payload: success,
      });
    },
    (error) => {
      console.log("ERROR");
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  );
};

export const dataUsers = (userData) => (dispatch) => {
 
  let config = {
    method: "GET",
    url: constants.baseUrl + "/api/v1/users",
    data: userData,
    headers: {
      Authorization: "Bearer " + userData.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log("CONFIG", config);
  axios(config).then(
    (success) => {
      console.log("SUCCESS");
      dispatch({
        type: GET_SUCCESS,
        payload: success,
      });
    },
    (error) => {
      console.log("ERROR");
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  );
};

export const addUsers = (userData) => (dispatch) => {
  console.log("userData requesting with ", userData);
 
  let config = {
    method: "POST",
    url: constants.baseUrl + "/api/v1/users",
    data: userData,
    headers: {
      Authorization: "Bearer " + userData.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log("CONFIG", config);
  axios(config).then(
    (success) => {
      console.log("SUCCESS");
      dispatch({
        type: GET_SUCCESS,
        payload: success,
      });
    },
    (error) => {
      console.log("ERROR");
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  );
};

export const updateUsers = (userData) => (dispatch) => {
  // var instance = axios.create();
  // instance.defaults.headers.common = {};

  // instance
  //     .put("/api/v1/users", userData)
  //     .then(res =>
  //         dispatch({
  //             type: GET_SUCCESS,
  //             payload: res,
  //         })
  //     ).catch(err =>
  //     dispatch({
  //         type: GET_ERRORS,
  //         payload: err.response.data
  //     })
  // );

  let config = {
    method: "PUT",
    url: constants.baseUrl + "/api/v1/users",
    data: userData,
    headers: {
      Authorization: "Bearer " + userData.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log("CONFIG", config);
  axios(config).then(
    (success) => {
      console.log("SUCCESS");
      dispatch({
        type: GET_SUCCESS,
        payload: success,
      });
    },
    (error) => {
      console.log("ERROR");
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  );
};

export const deleteUsers = (userData) => (dispatch) => {
  console.log("delete clicked");
  var instance = axios.create();
  instance.defaults.headers.common = {};

  instance
    .post("/api/v1/users/:id", userData)
    .then((res) =>
      dispatch({
        type: GET_SUCCESS,
        payload: res,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const assignProject = (userData) => (dispatch) => {
  console.log("userData requesting with ", userData);

  let config = {
    method: "POST",
    url: constants.baseUrl + "/api/v1/users/projects",
    data: userData,
    headers: {
      Authorization: "Bearer " + userData.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log("CONFIG", config);
  axios(config).then(
    (success) => {
      console.log("SUCCESS");
      dispatch({
        type: GET_SUCCESS,
        payload: success,
      });
    },
    (error) => {
      console.log("ERROR");
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  );
};

export const addSkill = (userData) => (dispatch) => {
  console.log("userData requesting with ", userData);

  let config = {
    method: "POST",
    url: constants.baseUrl + "/api/v1/users/skills",
    data: userData,
    headers: {
      Authorization: "Bearer " + userData.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log("CONFIG", config);
  axios(config).then(
    (success) => {
      console.log("SUCCESS");
      dispatch({
        type: GET_SUCCESS,
        payload: success,
      });
    },
    (error) => {
      console.log("ERROR");
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  );
};
