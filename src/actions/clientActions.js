import axios from "axios";
import { GET_ERRORS, GET_SUCCESS } from "./types";
import PropTypes from "prop-types";
import constants from "./../constants";

export const listClients = (clientData) => (dispatch) => {
  var instance = axios.create();
  instance.defaults.headers.common = {};

  instance
    // .post("/api/v1/users", userData)
    .get("/api/v1/clients", {
      headers: {
        authorization: "Bearer " + clientData.token,
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
        payload: err.response.data,
      })
    );
};

export const dataClients = (clientData) => (dispatch) => {
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
    url: constants.baseUrl + "/api/v1/clients",
    data: clientData,
    headers: {
      Authorization: "Bearer " + clientData.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log("CONFIG", config);
  axios(config).then(
    (success) => {
      console.log("SUCCESS");
      // for (let index = 0; index < success.data.length; index++) {
      //     if(success.data[index].client_code == clientData.client_code){
      //         //console.log(success.data[index].id)
      //         var idClient = success.data[index].id;
      //         console.log(idClient);
      //     }

      // }
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

export const addClients = (clientData) => (dispatch) => {
  console.log("clientData requesting with ", clientData);
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
    url: constants.baseUrl + "/api/v1/clients",
    data: clientData,
    headers: {
      Authorization: "Bearer " + clientData.token,
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

export const updateClients = (clientData) => (dispatch) => {
  // console.log(userData);
  // var instance = axios.create();
  // instance.defaults.headers.common = {};

  // instance
  //     .post("/api/v1/users/update", userData)
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
    url: constants.baseUrl + "/api/v1/clients",
    data: clientData,
    headers: {
      Authorization: "Bearer " + clientData.token,
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

export const deleteClients = (clientData) => (dispatch) => {
  //console.log('delete clicked', clientData)
  // var instance = axios.create();
  // instance.defaults.headers.common = {};

  // instance
  //     .post("/api/v1/clients/:id", clientData)
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
  let configg = {
    method: "GET",
    url: constants.baseUrl + "/api/v1/clients",
    data: clientData,
    headers: {
      Authorization: "Bearer " + clientData.token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log("CONFIG", configg);
  axios(configg).then(
    (success) => {
      console.log("SUCCESS");
      for (let index = 0; index < success.data.length; index++) {
        if (success.data[index].client_code == clientData.client_code) {
          //console.log(success.data[index].id)
          var idClient = success.data[index].id;
          console.log(idClient);

          let config = {
            method: "DELETE",
            url: `${constants.baseUrl}/api/v1/clients/${idClient}`,
            data: clientData,
            headers: {
              Authorization: "Bearer " + clientData.token,
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
        }
      }
    },
    (error) => {
      console.log("ERROR");
    }
  );
};
