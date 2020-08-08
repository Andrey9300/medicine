import axios from 'axios';
import {getResponseError} from '../../utils/errorsHelper';
import {WindowHelper} from '../../utils/windowHelper';

export function addPestLocation(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/pest/locations/store', new FormData(formElement))
      .then(() => {
        alert('Локация успешно создана');
        WindowHelper.pushState(`/services/pest/locations`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PEST_LOCATION_ADD_REJECTED',
        });
      });
  };
}

export function editPestLocation(
  formElement: HTMLFormElement = null,
  legalEntityId: number,
) {
  return (dispatch: any) => {
    axios
      .post(
        `/pest/locations/update/${legalEntityId}`,
        new FormData(formElement),
      )
      .then(() => {
        alert('Помещение успешно отредактировано');
        WindowHelper.pushState(`/services/pest/locations/${legalEntityId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PEST_LOCATION_EDIT_REJECTED',
        });
      });
  };
}

export function fetchPestLocations() {
  return (dispatch: any) => {
    axios
      .post('/pest/locations')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PEST_LOCATIONS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PEST_LOCATIONS_REJECTED',
        });
      });
  };
}

export function fetchPestLocation(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/pest/locations/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PEST_LOCATION_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PEST_LOCATION_REJECTED',
        });
      });
  };
}

export function deletePestLocation(id: number) {
  return () => {
    axios
      .post(`/pest/locations/destroy/${id}`)
      .then(() => {
        WindowHelper.pushState('/services/pest/locations');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearPestLocation() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'PEST_LOCATION_CLEAR',
    });
  };
}
