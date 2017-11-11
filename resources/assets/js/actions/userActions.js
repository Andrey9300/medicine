import axios from 'axios';
import {hashHistory} from 'react-router';

export function loginUser(formData) {
    return (dispatch) => {
        axios.post('/login', formData)
            .then((response) => {
                dispatch({
                    payload: {
                        isAuthenticated: response.status === 200
                    },
                    type: 'LOGIN_USER_FULFILLED'
                });
                hashHistory.replace('/hospitals');
            })
            .catch(() => {
                dispatch({
                    payload: false,
                    type: 'LOGIN_USER_REJECTED'
                });
            });
    };
}

export function logoutUser() {
    return (dispatch) => {
        axios.post('/logout')
            .then(() => {
                dispatch({
                    payload: {
                        isAuthenticated: false
                    },
                    type: 'LOGOUT_USER_FULFILLED'
                });
                hashHistory.replace('/login');
            })
            .catch(() => {
                dispatch({
                    payload: false,
                    type: 'LOGOUT_USER_REJECTED'
                });
            });
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
                    type: 'USERS_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'USERS_REJECTED'
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
                    type: 'USER_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'USER_REJECTED'
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
    return () => {
        axios.post(`/users/destroy/${id}`)
            .then(() => {
                hashHistory.push('/users');
            })
            .catch((error) => {
                return error;
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
                dispatch({
                    payload: response.data,
                    type: 'USER_RESEARCHES_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'USER_RESEARCHES_REJECTED'
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
                    type: 'USER_RESEARCH_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'USER_RESEARCH_REJECTED'
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
            .then(() => {
                dispatch(fetchUserResearches(idUser));
            })
            .catch((error) => {
                return error;
            });
    };
}
