import axios from 'axios';

export function fetchAuditors() {
  return (dispatch: any) => {
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

export function detachAuditor(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/users/detachAuditor/${id}`)
      .then(() => {
        alert('Права отозваны');
        window.location.reload();
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
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'AUDITORS_CLEAR',
    });
  };
}
