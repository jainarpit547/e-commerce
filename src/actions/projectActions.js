import axios from "axios";
import { GET_ERRORS, GET_SUCCESS } from "./types";
import PropTypes from "prop-types";
import constants from "./../constants";

export const listProjects = (proData) => (dispatch) => {
  var instance = axios.create();
  instance.defaults.headers.common = {};

  instance
    // .post("/api/v1/users", userData)
    .get("/api/v1/projects", {
      headers: {
        authorization: "Bearer " + proData.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) =>
      dispatch({
        type: GET_SUCCESS,
        payload: res,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const dataProjects = (proData) => (dispatch) => {
  // var instance = axios.create();
  // instance.defaults.headers.common = {};

  // instance
  //     .post("/api/v1/users", userData)
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
    method: "GET",
    url: constants.baseUrl + "/api/v1/projects",
    data: proData,
    headers: {
      Authorization: "Bearer " + proData.token,
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

export const addPorject = (proData) => (dispatch) => {
  console.log("proData requesting with ", proData);
  // var instance = axios.create();
  // instance.defaults.headers.common = {};

  // instance
  //     .post("/api/v1/users",{
  //         headers: {
  //             'authorization': "Bearer "+userData.token,
  //             'Accept' : 'application/json',
  //             'Content-Type': 'application/json'
  //         }
  //     })
  //     .then(res =>{
  //         console.log("RESPONSE")
  //         dispatch({
  //             type: GET_SUCCESS,
  //             payload: res,
  //         })}
  //     ).catch(err =>
  //     dispatch({
  //         type: GET_ERRORS,
  //         payload: err.response.data
  //     })
  // );
  let config = {
    method: "POST",
    url: constants.baseUrl + "/api/v1/projects",
    data: proData,
    headers: {
      Authorization: "Bearer " + proData.token,
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

export const updateProjects = (proData) => (dispatch) => {
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
    url: constants.baseUrl + "/api/v1/projects",
    data: proData,
    headers: {
      Authorization: "Bearer " + proData.token,
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

export const deleteProjects = (proData) => (dispatch) => {
  console.log("delete clicked");
  var instance = axios.create();
  instance.defaults.headers.common = {};

  instance
    .post("/api/v1/projects/:id", proData)
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

export const listProjectsDetail = (proData) => (dispatch) => {
  var instance = axios.create();
  instance.defaults.headers.common = {};

  instance
    // .post("/api/v1/users", userData)
    .get("/api/v1/projects/" + proData.project_id, {
      headers: {
        authorization: "Bearer " + proData.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) =>
      dispatch({
        type: GET_SUCCESS,
        payload: res,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const assignTech = (proData) => (dispatch) => {
  console.log("proData requesting with ", proData);
  let config = {
    method: "POST",
    url: constants.baseUrl + "/api/v1/projects/technologies",
    data: proData,
    headers: {
      Authorization: "Bearer " + proData.token,
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
    //console.log("CONFIG", config)
    // axios(config).then(
    //     success=>{
    //         console.log("SUCCESS")
    //         dispatch({
    //                     type: GET_SUCCESS,
    //                     payload: success,
    //         })
    //     },
    //     error=>{
    //         console.log("ERROR")
    //         dispatch({
    //                     type: GET_ERRORS,
    //                     payload: error.response.data
    //                 })
    //     }
    );
};

export const proMilestone = (proData) => dispatch => {
    console.log("mileData requesting with ", proData);
    let config = {
        method:'POST',
        url:'http://3.22.108.178:3335/api/v1/projects/milestones',
        data: proData,
        headers:{
            Authorization: "Bearer " + proData.token, Accept : 'application/json', 'Content-Type': 'application/json'
        }
    }
    console.log("CONFIG", config)
    axios(config).then(
        success=>{
            console.log("SUCCESS")
            dispatch({
                        type: GET_SUCCESS,
                        payload: success,
            })
        },
        error=>{
            console.log("ERROR")
            dispatch({
                        type: GET_ERRORS,
                        payload: error.response.data
                    })
        }
    );
};

