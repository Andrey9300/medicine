import axios from 'axios';
import {getResponseError} from '../../utils/errorsHelper';
import {WindowHelper} from '../../utils/windowHelper';

export function addPestPlace(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/pest/places/store', new FormData(formElement))
      .then(() => {
        alert('Точка контроля успешно создана');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PEST_PLACE_ADD_REJECTED',
        });
      });
  };
}

export function editPestPlace(
  formElement: HTMLFormElement = null,
  legalEntityId: number,
) {
  return (dispatch: any) => {
    axios
      .post(
        `/pest/places/update/${legalEntityId}`,
        new FormData(formElement),
      )
      .then(() => {
        alert('Точка контроля успешно отредактировано');
        WindowHelper.pushState(`/services/pest/places/${legalEntityId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PEST_PLACE_EDIT_REJECTED',
        });
      });
  };
}

export function fetchPestPlacesForLocation(locationId: number) {
  return (dispatch: any) => {
    axios
      .post(`/pest/places/forLocation/${locationId}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PEST_PLACES_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PEST_PLACES_REJECTED',
        });
      });
  };
}

export function fetchPestPlace(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/pest/places/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PEST_PLACE_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PEST_PLACE_REJECTED',
        });
      });
  };
}

export function deletePestPlace(id: number) {
  return () => {
    axios
      .post(`/pest/places/destroy/${id}`)
      .then(() => {
        WindowHelper.pushState('/services/pest/locations');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearPestPlace() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'PEST_PLACE_CLEAR',
    });
  };
}
