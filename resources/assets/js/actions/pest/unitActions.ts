import axios from 'axios';
import {getResponseError} from '../../utils/errorsHelper';
import {WindowHelper} from '../../utils/windowHelper';

export function addPestUnit(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/pest/units/store', new FormData(formElement))
      .then(() => {
        alert('Объект успешно создан');
        WindowHelper.pushState('/services/pest/locations');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PEST_UNIT_ADD_REJECTED',
        });
      });
  };
}

export function editPestUnitCurrent(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post(`/pest/units/update/current`, new FormData(formElement))
      .then(() => {
        alert('Объект успешно отредактирован');
        WindowHelper.pushState('/services/pest/locations');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'PEST_UNIT_EDIT_REJECTED',
        });
      });
  };
}

export function fetchPestUnitCurrent() {
  return (dispatch: any) => {
    axios
      .post(`/pest/units/current`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PEST_UNIT_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PEST_UNIT_REJECTED',
        });
      });
  };
}

export function deletePestUnit(id: number) {
  return () => {
    axios
      .post(`/pest/units/destroy/${id}`)
      .then(() => {
        WindowHelper.pushState('/services/pest/locations');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearPestUnit() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'PEST_UNIT_CLEAR',
    });
  };
}
