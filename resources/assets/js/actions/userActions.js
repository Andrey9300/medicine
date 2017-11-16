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
                hashHistory.replace('/organizations');
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

export function registrationUser(formData) {
    return (dispatch) => {
        axios.post('/register', formData)
            .then(() => {
                dispatch({
                    payload: true,
                    type: 'REGISTRATION_USER_FULFILLED'
                });
                hashHistory.replace('/organizations');
            })
            .catch(() => {
                dispatch({
                    payload: false,
                    type: 'REGISTRATION_USER_REJECTED'
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
