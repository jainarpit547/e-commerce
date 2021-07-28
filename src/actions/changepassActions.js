import axios from "axios";
import {
    GET_ERRORS,
    GET_SUCCESS
} from "./types";

export const updatePassword = (userData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/users/changepassword", userData,{
            headers: {
                'authorization': "Bearer "+userData.token,
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
