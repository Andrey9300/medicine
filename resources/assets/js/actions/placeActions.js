import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addPlace(formElement = null) {
  return (dispatch) => {
    axios
      .post('/places/store', new FormData(formElement))
      .then(() => {
        alert('Помещение успешно создано');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PLACE_ADD_REJECTED',
        });
      });
  };
}

export function editPlace(formElement = null, legalEntityId) {
  return (dispatch) => {
    axios
      .post(`/places/update/${legalEntityId}`, new FormData(formElement))
      .then(() => {
        alert('Критерий успешно отредактирован');
        history.pushState(null, null, `/place/${legalEntityId}`);
        window.place.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PLACE_EDIT_REJECTED',
        });
      });
  };
}

export function fetchPlaces() {
  return (dispatch) => {
    axios
      .post('/places')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PLACES_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PLACES_REJECTED',
        });
      });
  };
}

export function fetchPlace(id) {
  return (dispatch) => {
    axios
      .post(`/places/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PLACE_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PLACE_REJECTED',
        });
      });
  };
}

export function deletePlace(id) {
  return () => {
    axios
      .post(`/places/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/places');
        window.place.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearPlace() {
  return (dispatch) => {
    dispatch({
      payload: [],
      type: 'PLACE_CLEAR',
    });
  };
}

