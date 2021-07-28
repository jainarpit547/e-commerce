import axios from "axios";
import {
    GET_ERRORS,
    GET_SUCCESS
} from "./types";

export const listEmail = (history) => dispatch => {
    axios
        .post("/api/emailtemplates/email-list")
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

export const dataEmail = (emailData, history) => dispatch => {
    axios
        .post("/api/emailtemplates/email-data", emailData)
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

export const updateEmail = (emailData, history) => dispatch => {
    axios
        .post("/api/emailtemplates/email-update", emailData)
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
