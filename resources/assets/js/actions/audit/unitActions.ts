import axios from 'axios';
import {getResponseError} from '../../utils/errorsHelper';

export function addUnit(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/units/store', new FormData(formElement))
      .then(() => {
        alert('Подразделение успешно создано');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'UNIT_ADD_REJECTED',
        });
      });
  };
}

export function editUnit(
  formElement: HTMLFormElement = null,
  legalEntityId: number,
) {
  return (dispatch: any) => {
    axios
      .post(`/units/update/${legalEntityId}`, new FormData(formElement))
      .then(() => {
        alert('Критерий успешно отредактирован');
        history.pushState(null, null, `/services/audits/unit/${legalEntityId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'UNIT_EDIT_REJECTED',
        });
      });
  };
}

export function fetchUnits() {
  return (dispatch: any) => {
    axios
      .post('/units')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'UNITS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'UNITS_REJECTED',
        });
      });
  };
}

export function fetchUnit(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/units/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'UNIT_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'UNIT_REJECTED',
        });
      });
  };
}

export function deleteUnit(id: number) {
  return () => {
    axios
      .post(`/units/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/services/audits/units');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearUnit() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'UNIT_CLEAR',
    });
  };
}
