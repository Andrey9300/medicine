import axios from 'axios';
import {getResponseError} from '../../utils/errorsHelper';
import {WindowHelper} from '../../utils/windowHelper';

export function addPestControl(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/pest/control/store', new FormData(formElement))
      .then(() => {
        alert('Контроль успешно проведен');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PEST_CONTROL_ADD_REJECTED',
        });
      });
  };
}

export function editPestControl(
  formElement: HTMLFormElement = null,
  legalEntityId: number,
) {
  return (dispatch: any) => {
    axios
      .post(
        `/pest/control/update/${legalEntityId}`,
        new FormData(formElement),
      )
      .then(() => {
        alert('Точка контроля успешно отредактировано');
        WindowHelper.pushState(`/services/pest/control/${legalEntityId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PEST_CONTROL_EDIT_REJECTED',
        });
      });
  };
}

export function fetchPestControlsForLocation(locationId: number) {
  return (dispatch: any) => {
    axios
      .post(`/pest/control/forLocation/${locationId}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PEST_CONTROLS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PEST_CONTROLS_REJECTED',
        });
      });
  };
}

export function fetchPestControl(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/pest/control/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PEST_CONTROL_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PEST_CONTROL_REJECTED',
        });
      });
  };
}

export function deletePestControl(id: number) {
  return () => {
    axios
      .post(`/pest/control/destroy/${id}`)
      .then(() => {
        WindowHelper.pushState('/services/pest/locations');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearPestControl() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'PEST_CONTROL_CLEAR',
    });
  };
}
