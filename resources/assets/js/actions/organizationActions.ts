import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addOrganization(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/organizations/store', new FormData(formElement))
      .then(() => {
        alert('Объект успешно создан');
        history.pushState(null, null, '/lmk/organizations');
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

export function editOrganization(
  formElement: HTMLFormElement = null,
  legalEntityId: number,
) {
  return (dispatch: any) => {
    axios
      .post(`/organizations/update/${legalEntityId}`, new FormData(formElement))
      .then(() => {
        alert('Объект успешно отредактирован');
        history.pushState(null, null, `/lmk/organization/${legalEntityId}`);
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
  return (dispatch: any) => {
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
        history.replaceState(null, null, '/lmk/login');
        window.location.reload();
      });
  };
}

export function fetchExpiredOrganizations(legalEntityId: number = null) {
  return (dispatch: any) => {
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
        history.replaceState(null, null, '/lmk/login');
        window.location.reload();
        dispatch({
          payload: error,
          type: 'EXPIRED_ORGANIZATIONS_REJECTED',
        });
      });
  };
}

export function fetchOrganization(id: number) {
  return (dispatch: any) => {
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

export function fetchOrganizationEmployeesWithCheck(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/organizations/employeesWithCheck/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'ORGANIZATION_EMPLOYEES_WITH_CHECK_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'ORGANIZATION_EMPLOYEES_WITH_CHECK_REJECTED',
        });
      });
  };
}

export function fetchOrganizationTrashedEmployees(id: number) {
  return (dispatch: any) => {
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

export function deleteOrganization(id: number) {
  return () => {
    axios
      .post(`/organizations/destroy/${id}`)
      .then((answer) => {
        if (answer && answer.data && answer.data.hasEmployees) {
          alert(
            'Перед удалением организации перенесите сотрудников в другие компании, в том числе из архива',
          );
        } else {
          history.pushState(null, null, '/lmk/organizations');
          window.location.reload();
        }
      })
      .catch((error) => {
        return error;
      });
  };
}

export function deleteOrganizationEmployee(idOrganization: number, idEmployee: number) {
  return () => {
    axios
      .post(`/organizations/employees/destroy/${idOrganization}/${idEmployee}`)
      .then(() => {
        history.pushState(null, null, `/lmk/organization/${idOrganization}`);
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function clearOrganization() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'ORGANIZATION_CLEAR',
    });
  };
}

export function clearOrganizationEmployees() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'ORGANIZATION_EMPLOYEES_CLEAR',
    });
  };
}
