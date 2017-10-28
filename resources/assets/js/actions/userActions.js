import {NotificationManager} from 'react-notifications';
import axios from 'axios';

export function loginUser(formData) {
    return (dispatch) => {
        axios.post('/login', formData)
            .then(() => {
                dispatch({
                    payload: true,
                    type: 'FETCH_LOGIN_USER_FULFILLED'
                });
            })
            .catch(() => {
                dispatch({
                    payload: false,
                    type: 'FETCH_LOGIN_USER_REJECTED'
                });
            });
    };
}

export function logout() {
    return {
        type: LOGOUT_SUCCESS
    };
}

/**
 * Fetch
 * @returns {function(*)}
 */
export function fetchUsers() {
    return (dispatch) => {
        axios.post('/users')
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: 'FETCH_USERS_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_USERS_REJECTED'
                });
            });
    };
}

/**
 * Fetch
 * @param id
 * @returns {function(*)}
 */
export function fetchUser(id) {
    return (dispatch) => {
        axios.post(`/users/${id}`)
            .then((response) => {
                dispatch({
                    payload: response.data.user,
                    type: 'FETCH_USER_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_USER_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param id number
 * @returns {Function}
 */
export function deleteUser(id) {
    return (dispatch) => {
        axios.post(`/users/destroy/${id}`)
            .then((response) => {
                NotificationManager.success(response.data.message, 'Success');
                dispatch(fetchUsers());
            })
            .catch((error) => {
                NotificationManager.error('An error occured in the operation', 'Error', error);
            });
    };
}

/**
 * Исследования сотрудников учреждений
 */

/**
 * Fetch
 * @param id - id мед учреждения
 * @returns {function(*)}
 */
export function fetchUserResearches(id) {
    return (dispatch) => {
        axios.post(`/users/researches/${id}`)
            .then((response) => {
                console.log(response, 'resp');
                dispatch({
                    payload: response.data,
                    type: 'FETCH_USER_RESEARCHES_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_USER_RESEARCHES_REJECTED'
                });
            });
    };
}

/**
 * Fetch
 * @param id_user, id_research
 * @returns {function(*)}
 */
export function fetchUserResearch(idUser, idResearch) {
    return (dispatch) => {
        axios.post(`/users/researches/edit/${idUser}/${idResearch}`)
            .then((response) => {
                dispatch({
                    payload: response.data.user_research,
                    type: 'FETCH_USER_RESEARCH_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_USER_RESEARCH_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param id number
 * @returns {Function}
 */
export function deleteUserResearch(idUser, idResearch) {
    return (dispatch) => {
        axios.post(`/users/researches/destroy/${idUser}/${idResearch}`)
            .then((response) => {
                NotificationManager.success(response.data.message, 'Success');
                dispatch(fetchUserResearches(idUser));
            })
            .catch((error) => {
                NotificationManager.error('An error occured in the operation', 'Error', error);
            });
    };
}
