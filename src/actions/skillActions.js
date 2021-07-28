import axios from "axios";
import {
    GET_ERRORS,
    GET_SUCCESS
} from "./types";

export const listSkill = (authData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .get("/api/v1/skill",{
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

export const dataSkill = (skillData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/skill/data", skillData)
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

export const addSkill = (skillData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/skill/add", skillData)
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

export const updateSkill = (skillData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/skill/update", skillData)
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

export const deleteSkill = (skillData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/skill/delete", skillData)
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
