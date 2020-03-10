import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addGroupCriterionList(formElement = null) {
  return (dispatch) => {
    axios
      .post('/groupCriterionLists/store', new FormData(formElement))
      .then(() => {
        alert('Критерий успешно создан');
        history.pushState(null, null, `criterionLists`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'GROUP_CRITERION_LIST_ADD_REJECTED',
        });
      });
  };
}

export function editGroupCriterionList(formElement = null, legalEntityId) {
  return (dispatch) => {
    axios
      .post(`/groupCriterionLists/update/${legalEntityId}`, new FormData(formElement))
      .then(() => {
        alert('Критерий успешно отредактирован');
        history.pushState(null, null, `/groupCriterionList/${legalEntityId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'GROUP_CRITERION_LIST_EDIT_REJECTED',
        });
      });
  };
}

export function fetchGroupCriterionLists() {
  return (dispatch) => {
    axios
      .post('/groupCriterionLists')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'GROUP_CRITERION_LISTS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'GROUP_CRITERION_LISTS_REJECTED',
        });
      });
  };
}

export function fetchGroupCriterionList(id) {
  return (dispatch) => {
    axios
      .post(`/groupCriterionLists/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'GROUP_CRITERION_LIST_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'GROUP_CRITERION_LIST_REJECTED',
        });
      });
  };
}

export function deleteGroupCriterionList(id) {
  return () => {
    axios
      .post(`/groupCriterionLists/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/groupCriterionLists');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearGroupCriterionList() {
  return (dispatch) => {
    dispatch({
      payload: [],
      type: 'GROUP_CRITERION_LIST_CLEAR',
    });
  };
}
