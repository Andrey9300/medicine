import axios from 'axios';
import {getResponseError} from '../../utils/errorsHelper';

export function addLocation(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/locations/store', new FormData(formElement))
      .then(() => {
        alert('Локация успешно создана');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'LOCATION_ADD_REJECTED',
        });
      });
  };
}

export function editLocation(
  formElement: HTMLFormElement = null,
  legalEntityId: number,
) {
  return (dispatch: any) => {
    axios
      .post(`/locations/update/${legalEntityId}`, new FormData(formElement))
      .then(() => {
        alert('Локация успешно отредактирована');
        history.pushState(null, null, `/services/audits/location/${legalEntityId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'LOCATION_EDIT_REJECTED',
        });
      });
  };
}

export function fetchLocations() {
  return (dispatch: any) => {
    axios
      .post('/locations')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'LOCATIONS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'LOCATIONS_REJECTED',
        });
      });
  };
}

export function fetchLocation(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/locations/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'LOCATION_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'LOCATION_REJECTED',
        });
      });
  };
}

export function deleteLocation(id: number) {
  return () => {
    axios
      .post(`/locations/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/services/audits/locations');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearLocation() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'LOCATION_CLEAR',
    });
  };
}
