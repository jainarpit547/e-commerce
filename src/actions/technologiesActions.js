import axios from "axios";
import {
    GET_ERRORS,
    GET_SUCCESS
} from "./types";

export const listTechnologies = (authData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .get("/api/v1/technologies",{
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

export const dataTechnologies = (technoData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .get("/api/v1/technologies",{
            headers: {
                'authorization': "Bearer "+technoData.token,
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
            payload: err.response.data,
        })
    );
};

// export const dataTechnologies = (technoData) => dispatch => {
//     var instance = axios.create();
//     instance.defaults.headers.common = {};

//     instance
//         .get("/api/v1/technologies", technoData)
//         .then(res =>
//             dispatch({
//                 type: GET_SUCCESS,
//                 payload: res,
//             })
//         ).catch(err =>
//         dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         })
//     );
// };

export const addTechnologies = (technoData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/technologies", technoData)
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

export const updateTechnologies = (technoData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/technologies/update", technoData)
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

export const deleteTechnologies = (technoData) => dispatch => {
    var instance = axios.create();
    instance.defaults.headers.common = {};

    instance
        .post("/api/v1/technologies/delete", technoData)
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
