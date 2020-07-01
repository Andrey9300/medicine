import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addCriterionList(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/criterionLists/store', new FormData(formElement))
      .then(() => {
        alert('Локация успешно создана');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'CRITERION_LIST_ADD_REJECTED',
        });
      });
  };
}

export function editCriterionList(
  formElement: HTMLFormElement = null,
  legalEntityId: number,
) {
  return (dispatch: any) => {
    axios
      .post(
        `/criterionLists/update/${legalEntityId}`,
        new FormData(formElement),
      )
      .then(() => {
        alert('Критерий успешно отредактирован');
        history.pushState(null, null, `/services/audits/criterionList/${legalEntityId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'CRITERION_LIST_EDIT_REJECTED',
        });
      });
  };
}

export function fetchCriterionLists() {
  return (dispatch: any) => {
    axios
      .post('/criterionLists')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'CRITERION_LISTS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'CRITERION_LISTS_REJECTED',
        });
      });
  };
}

export function fetchCriterionList(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/criterionLists/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'CRITERION_LIST_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'CRITERION_LIST_REJECTED',
        });
      });
  };
}

export function deleteCriterionList(id: number) {
  return () => {
    axios
      .post(`/criterionLists/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/services/audits/criterionLists');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearCriterionList() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'CRITERION_LIST_CLEAR',
    });
  };
}
