import axios from 'axios';

/**
 * Вход
 *
 * @param formElement
 * @returns {function(*)}
 */
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
          payload: errors.response.data.errors,
          type: 'LOGIN_USER_REJECTED',
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

/**
 * Регистрация
 *
 * @param formData
 * @returns {function(*)}
 */
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
          payload: errors.response.data.errors,
          type: 'REGISTRATION_USER_REJECTED',
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

/**
 * Получить текущего пользователя системы, если есть
 *
 * @returns {function(*)}
 */
export function fetchUser() {
  return (dispatch) => {
    axios
      .post('/users/current')
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

/**
 * Удалить пользователя системы
 *
 * @param id number
 * @returns {Function}
 */
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
