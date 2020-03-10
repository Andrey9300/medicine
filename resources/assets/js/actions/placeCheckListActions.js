import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addPlaceCheckList(formElement = null) {
  return (dispatch) => {
    axios
      .post('/placeCheckLists/store', new FormData(formElement))
      .then(() => {
        alert('Помещение успешно создано');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PLACE_CHECK_LIST_ADD_REJECTED',
        });
      });
  };
}

export function editPlaceCheckList(formElement = null, legalEntityId) {
  return (dispatch) => {
    axios
      .post(`/placeCheckLists/update/${legalEntityId}`, new FormData(formElement))
      .then(() => {
        alert('Чек лист успешно отредактирован');
        history.pushState(null, null, `/placeCheckList/${legalEntityId}`);
        window.placeCheckList.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PLACE_CHECK_LIST_EDIT_REJECTED',
        });
      });
  };
}

export function fetchPlaceCheckLists() {
  return (dispatch) => {
    axios
      .post('/placeCheckLists')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PLACE_CHECK_LISTS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PLACE_CHECK_LISTS_REJECTED',
        });
      });
  };
}

export function fetchPlaceCheckList(id) {
  return (dispatch) => {
    axios
      .post(`/placeCheckLists/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PLACE_CHECK_LIST_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PLACE_CHECK_LIST_REJECTED',
        });
      });
  };
}

export function deletePlaceCheckList(id) {
  return () => {
    axios
      .post(`/placeCheckLists/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/placeCheckLists');
        window.placeCheckList.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearPlaceCheckList() {
  return (dispatch) => {
    dispatch({
      payload: [],
      type: 'PLACE_CHECK_LIST_CLEAR',
    });
  };
}

