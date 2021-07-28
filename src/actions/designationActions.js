import axios from "axios";
import {
    GET_ERRORS,
    GET_SUCCESS
} from "./types";

export const listDesignation = (authData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .get("/api/v1/designation",{
            headers: {
                'authorization': "Bearer "+authData.token,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res =>
            dispatch({
                type: GET_SUCCESS,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const dataDesignation = (desigData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/designation/data", desigData)
        .then(res =>
            dispatch({
                type: GET_SUCCESS,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const addDesignation = (desigData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/designation/add", desigData)
        .then(res =>
            dispatch({
                type: GET_SUCCESS,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const updateDesignation = (desigData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/designation/update", desigData)
        .then(res =>
            dispatch({
                type: GET_SUCCESS,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const deleteDesignation = (desigData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/designation/delete", desigData)
        .then(res =>
            dispatch({
                type: GET_SUCCESS,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
