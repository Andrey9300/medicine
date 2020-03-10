import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function loginUser(formElement = null) {
  return (dispatch) => {
    axios
      .post('/login', new FormData(formElement))
      .then(() => {
        dispatch({
          payload: {
            isAuthenticated: true,
          },
          type: 'LOGIN_USER_FULFILLED',
        });
        history.pushState(null, null, '/organizations');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'LOGIN_USER_REJECTED',
        });
      });
  };
}

export function logoutUser() {
  return (dispatch) => {
    axios
      .post('/logout')
      .then(() => {
        dispatch({
          payload: {
            isAuthenticated: false,
          },
          type: 'LOGOUT_USER_FULFILLED',
        });
        history.pushState(null, null, '/login');
        window.location.reload();
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'LOGOUT_USER_REJECTED',
        });
      });
  };
}

export function registrationUser(formElement = null) {
  return (dispatch) => {
    axios
      .post('/register', new FormData(formElement))
      .then(() => {
        alert('Вам отправлен email для активации аккаунта');
        history.replaceState(null, null, '/login');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'REGISTRATION_USER_REJECTED',
        });
      });
  };
}

export function registrationAuditorUser(formElement = null) {
  return (dispatch) => {
    axios
      .post('/users/store', new FormData(formElement))
      .then(() => {
        alert('Аудитор добавлен');
        history.replaceState(null, null, '/auditors');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'REGISTRATION_AUDITOR_USER_REJECTED',
        });
      });
  };
}

export function fetchUsers() {
  return (dispatch) => {
    axios
      .post('/users')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'USERS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'USERS_REJECTED',
        });
      });
  };
}

export function fetchCurrentUser() {
  return (dispatch) => {
    axios
      .post('/users/current')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'CURRENT_USER_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'CURRENT_USER_REJECTED',
        });
      });
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    axios
      .post(`/users/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'USER_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'USER_REJECTED',
        });
      });
  };
}

export function editUser(formElement = null, userId) {
  return (dispatch) => {
    axios
      .post(`/users/edit/${userId}`, new FormData(formElement))
      .then((response) => {
        dispatch({
          payload: response,
          type: 'USER_FULFILLED',
        });
        alert('Профиль успешно отредактирован');
        history.pushState(null, null, `/profile`);
        window.location.reload();
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'USER_REJECTED',
        });
      });
  };
}

export function deleteUser(id) {
  return () => {
    axios
      .post(`/users/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/users');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}
