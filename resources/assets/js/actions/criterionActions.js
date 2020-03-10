import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addCriterion(formElement = null) {
  return (dispatch) => {
    axios
      .post('/criterions/store', new FormData(formElement))
      .then(() => {
        alert('Критерий успешно создан');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'CRITERION_ADD_REJECTED',
        });
      });
  };
}

export function editCriterion(formElement = null, legalEntityId) {
  return (dispatch) => {
    axios
      .post(`/criterions/update/${legalEntityId}`, new FormData(formElement))
      .then(() => {
        alert('Критерий успешно отредактирован');
        history.pushState(null, null, `/criterion/${legalEntityId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'CRITERION_EDIT_REJECTED',
        });
      });
  };
}

export function fetchCriterions() {
  return (dispatch) => {
    axios
      .post('/criterions')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'CRITERIONS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'CRITERIONS_REJECTED',
        });
      });
  };
}

export function fetchCriterion(id) {
  return (dispatch) => {
    axios
      .post(`/criterions/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'CRITERION_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'CRITERION_REJECTED',
        });
      });
  };
}

export function deleteCriterion(id) {
  return () => {
    axios
      .post(`/criterions/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/criterions');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearCriterion() {
  return (dispatch) => {
    dispatch({
      payload: [],
      type: 'CRITERION_CLEAR',
    });
  };
}

