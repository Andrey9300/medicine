import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addOrganization(formElement = null) {
  return (dispatch) => {
    axios
      .post('/organizations/store', new FormData(formElement))
      .then(() => {
        alert('Объект успешно создан');
        history.pushState(null, null, '/organizations');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'ORGANIZATION_ADD_REJECTED',
        });
      });
  };
}

export function editOrganization(formElement = null, legalEntityId) {
  return (dispatch) => {
    axios
      .post(`/organizations/update/${legalEntityId}`, new FormData(formElement))
      .then(() => {
        alert('Объект успешно отредактирован');
        history.pushState(null, null, `/organization/${legalEntityId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'ORGANIZATION_EDIT_REJECTED',
        });
      });
  };
}

export function fetchOrganizations() {
  return (dispatch) => {
    axios
      .post('/organizations')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'ORGANIZATIONS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'ORGANIZATIONS_REJECTED',
        });
        history.replaceState(null, null, '/login');
        window.location.reload();
      });
  };
}

export function fetchExpiredOrganizations(legalEntityId = null) {
  return (dispatch) => {
    axios
      .post('/organizations/expired', {
        legalEntityId: legalEntityId,
      })
      .then((response) => {
        dispatch({
          payload: response,
          type: 'EXPIRED_ORGANIZATIONS_FULFILLED',
        });
      })
      .catch((error) => {
        history.replaceState(null, null, '/login');
        window.location.reload();
        dispatch({
          payload: error,
          type: 'EXPIRED_ORGANIZATIONS_REJECTED',
        });
      });
  };
}

export function fetchOrganization(id) {
  return (dispatch) => {
    axios
      .post(`/organizations/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'ORGANIZATION_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'ORGANIZATION_REJECTED',
        });
      });
  };
}

export function fetchOrganizationTrashedEmployees(id) {
  return (dispatch) => {
    axios
      .post(`/organizations/trashedEmployees/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'ORGANIZATION_TRASHED_EMPLOYEES_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'ORGANIZATION_TRASHED_EMPLOYEES_REJECTED',
        });
      });
  };
}

export function deleteOrganization(id) {
  return () => {
    axios
      .post(`/organizations/destroy/${id}`)
      .then((answer) => {
        if (answer && answer.data && answer.data.hasEmployees) {
          alert('Перед удалением организации перенесите сотрудников в другие компании, в том числе из архива')
        } else {
          history.pushState(null, null, '/organizations');
          window.location.reload();
        }
      })
      .catch((error) => {
        return error;
      });
  };
}

export function deleteOrganizationEmployee(idOrganization, idEmployee) {
  return () => {
    axios
      .post(`/organizations/employees/destroy/${idOrganization}/${idEmployee}`)
      .then(() => {
        history.pushState(null, null, `/organization/${idOrganization}`);
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearOrganization() {
  return (dispatch) => {
    dispatch({
      payload: [],
      type: 'ORGANIZATION_CLEAR',
    });
  };
}


export function clearOrganizationEmployees() {
  return (dispatch) => {
    dispatch({
      payload: [],
      type: 'ORGANIZATION_EMPLOYEES_CLEAR',
    });
  };
}

