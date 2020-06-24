import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function loginUser(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/login', new FormData(formElement))
      .then(() => {
        dispatch({
          payload: {
            isAuthenticated: true,
          },
          type: 'LOGIN_USER_FULFILLED',
        });
        history.pushState(null, null, '/lmk/organizations');
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
  return (dispatch: any) => {
    axios
      .post('/logout')
      .then(() => {
        dispatch({
          payload: {
            isAuthenticated: false,
          },
          type: 'LOGOUT_USER_FULFILLED',
        });
        history.pushState(null, null, '/lmk/login');
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

export function registrationUser(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
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

export function registrationAuditorUser(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
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
  return (dispatch: any) => {
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
  return (dispatch: any) => {
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

export function fetchUser(id: number) {
  return (dispatch: any) => {
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

export function editUser(formElement: HTMLFormElement = null, userId: number) {
  return (dispatch: any) => {
    axios
      .post(`/users/edit/${userId}`, new FormData(formElement))
      .then((response) => {
        dispatch({
          payload: response,
          type: 'USER_FULFILLED',
        });
        alert('Профиль успешно отредактирован');
        history.pushState(null, null, `/lmk/profile`);
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

export function deleteUser(id: number) {
  return () => {
    axios
      .post(`/users/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/lmk/users');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}
