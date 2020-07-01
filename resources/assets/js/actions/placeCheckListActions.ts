import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addPlaceCheckList(
  formElement: HTMLFormElement = null,
  placeCheckListId: number,
) {
  return (dispatch: any) => {
    axios
      .post(
        `/placeCheckLists/store/${placeCheckListId}`,
        new FormData(formElement),
      )
      .then(() => {
        alert('Помещение успешно создано');
        history.pushState(
          null,
          null,
          `/services/lmk/placeCheckList/${placeCheckListId}`,
        );
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

export function editPlaceCheckList(
  formElement: HTMLFormElement = null,
  legalEntityId: number,
) {
  return (dispatch: any) => {
    axios
      .post(
        `/placeCheckLists/update/${legalEntityId}`,
        new FormData(formElement),
      )
      .then(() => {
        alert('Чек лист успешно отредактирован');
        history.pushState(null, null, `/services/lmk/placeCheckList/${legalEntityId}`);
        window.location.reload();
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
  return (dispatch: any) => {
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

export function fetchPlaceCheckList(id: number) {
  return (dispatch: any) => {
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

export function fetchPlaceCheckListCriterions(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/placeCheckLists/criterions/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'PLACE_CHECK_LIST_CRITERIONS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'PLACE_CHECK_LIST_CRITERIONS_REJECTED',
        });
      });
  };
}

export function deletePlaceCheckList(id: number) {
  return () => {
    axios
      .post(`/placeCheckLists/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/services/lmk/placeCheckLists');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearPlaceCheckList() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'PLACE_CHECK_LIST_CLEAR',
    });
  };
}
