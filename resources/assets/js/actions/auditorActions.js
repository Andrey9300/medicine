import axios from 'axios';

export function fetchAuditors() {
  return (dispatch) => {
    axios
      .post('/users/auditors')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'AUDITORS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'AUDITORS_REJECTED',
        });
      });
  };
}

export function clearAuditors() {
  return (dispatch) => {
    dispatch({
      payload: [],
      type: 'AUDITORS_CLEAR',
    });
  };
}
