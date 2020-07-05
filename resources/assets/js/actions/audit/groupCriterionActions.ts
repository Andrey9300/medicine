import axios from 'axios';
import {getResponseError} from '../../utils/errorsHelper';

export function addGroupCriterion(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/groupCriterions/store', new FormData(formElement))
      .then(() => {
        alert('Критерий успешно создан');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'GROUP_CRITERION_ADD_REJECTED',
        });
      });
  };
}

export function editGroupCriterion(
  formElement: HTMLFormElement = null,
  legalEntityId: number,
) {
  return (dispatch: any) => {
    axios
      .post(
        `/groupCriterions/update/${legalEntityId}`,
        new FormData(formElement),
      )
      .then(() => {
        alert('Критерий успешно отредактирован');
        history.pushState(null, null, `/services/audits/groupCriterion/${legalEntityId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'GROUP_CRITERION_EDIT_REJECTED',
        });
      });
  };
}

export function fetchGroupCriterions() {
  return (dispatch: any) => {
    axios
      .post('/groupCriterions')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'GROUP_CRITERIONS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'GROUP_CRITERIONS_REJECTED',
        });
      });
  };
}

export function fetchGroupCriterion(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/groupCriterions/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'GROUP_CRITERION_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'GROUP_CRITERION_REJECTED',
        });
      });
  };
}

export function deleteGroupCriterion(id: number) {
  return () => {
    axios
      .post(`/groupCriterions/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/services/audits/groupCriterions');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearGroupCriterion() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'GROUP_CRITERION_CLEAR',
    });
  };
}
