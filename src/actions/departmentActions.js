import axios from "axios";
import {
    GET_ERRORS,
    GET_SUCCESS
} from "./types";

export const listDepartment = (authData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .get("/api/v1/department",{
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

export const dataDepartment = (departData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/department/data", departData)
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

export const addDepartment = (departData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/department/add", departData)
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

export const updateDepartment = (departData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/department/update", departData)
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

export const deleteDepartment = (departData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/department/delete", departData)
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
