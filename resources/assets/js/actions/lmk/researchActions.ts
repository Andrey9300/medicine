import axios from 'axios';
import {getResponseError} from '../../utils/errorsHelper';

export function fetchResearch(id: number) {
  return (dispatch: any) => {
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

export function fetchUserResearches() {
  return (dispatch: any) => {
    axios
      .post('/userResearches')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'USER_RESEARCHES_FULFILLED',
        });
      })
      .catch((error) => {
        history.replaceState(null, null, '/services/login');
        window.location.reload();
        dispatch({
          payload: error,
          type: 'USER_RESEARCHES_REJECTED',
        });
      });
  };
}

export function addUserResearches(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/userResearches/store', new FormData(formElement))
      .then(() => {
        alert('Изменения сохранены');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'ADD_USER_RESEARCH_REJECTED',
        });
      });
  };
}
