import axios from 'axios';

/**
 * Получить исследование
 *
 * @param id
 * @returns {function(*)}
 */
export function fetchResearch(id) {
  return (dispatch) => {
    axios
      .post(`/researches/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'RESEARCH_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'RESEARCH_REJECTED',
        });
      });
  };
}

/**
 * Все исследования admin
 *
 * @returns {function(*)}
 */
export function fetchUserResearches() {
  return (dispatch) => {
    axios
      .post('/userResearches')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'USER_RESEARCHES_FULFILLED',
        });
      })
      .catch((error) => {
        history.replaceState(null, null, '/login');
        window.location.reload();
        dispatch({
          payload: error,
          type: 'USER_RESEARCHES_REJECTED',
        });
      });
  };
}

export function addUserResearches(formElement = null) {
  return (dispatch) => {
    axios
      .post('/userResearches/store', new FormData(formElement))
      .then(() => {
        alert('Изменения сохранены');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: errors.response.data.errors,
          type: 'ADD_USER_RESEARCH_REJECTED',
        });
      });
  };
}
