import axios from 'axios';
import {hashHistory} from 'react-router';

/**
 * Вход
 *
 * @param formData
 * @returns {function(*)}
 */
export function loginUser(formData) {
    return (dispatch) => {
        axios.post('/login', formData)
            .then(() => {
                dispatch({
                    payload: true,
                    type: 'LOGIN_USER_FULFILLED'
                });
                hashHistory.replace('/organizations');
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'LOGIN_USER_REJECTED'
                });
            });
    };
}

/**
 * Выход
 *
 * @returns {function(*)}
 */
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
                window.location.reload();
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'LOGOUT_USER_REJECTED'
                });
            });
    };
}

/**
 * Регистрация
 *
 * @param formData
 * @returns {function(*)}
 */
export function registrationUser(formData) {
    return (dispatch) => {
        axios.post('/register', formData)
            .then(() => {
                dispatch({
                    payload: true,
                    type: 'REGISTRATION_USER_FULFILLED'
                });
                hashHistory.replace('/login');
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'REGISTRATION_USER_REJECTED'
                });
            });
    };
}

/**
 * TODO пользователей
 * Получить всех пользователей системы
 *
 * @returns {function(*)}
 */
export function fetchUsers() {
    return (dispatch) => {
        axios.post('/users')
            .then((response) => {
                dispatch({
                    payload: response,
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
 * Получить текущего пользователя системы, если есть
 *
 * @returns {function(*)}
 */
export function fetchUser() {
    return (dispatch) => {
        axios.post('/users/current')
            .then((response) => {
                dispatch({
                    payload: response,
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
 * Удалить пользователя системы
 *
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
