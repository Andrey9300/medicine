import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addEmployee(formElement = null) {
  return (dispatch) => {
    axios
      .post('/employees/store', new FormData(formElement))
      .then(() => {
        alert('Сотрудник успешно создан');
        history.pushState(null, null, '/lmk/employees/');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'EMPLOYEE_ADD_REJECTED',
        });
      });
  };
}

export function editEmployee(formElement = null, employeeId) {
  return (dispatch) => {
    axios
      .post(`/employees/update/${employeeId}`, new FormData(formElement))
      .then(() => {
        alert('Сотрудник успешно отредактирован');
        history.pushState(null, null, `/lmk/employee/${employeeId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'EMPLOYEE_ADD_REJECTED',
        });
      });
  };
}

export function editEmployeeJson(formElement = null, employeeId) {
  return (dispatch) => {
    axios
      .post(`/employees/update/${employeeId}`, formElement)
      .then(() => {
        alert('Сотрудник успешно отредактирован');
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'EMPLOYEE_ADD_REJECTED',
        });
      });
  };
}

export function fetchEmployees(legalEntityId = null) {
  return (dispatch) => {
    axios
      .post('/employees', {
        legalEntityId: legalEntityId,
      })
      .then((response) => {
        dispatch({
          payload: response,
          type: 'EMPLOYEES_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'EMPLOYEES_REJECTED',
        });
      });
  };
}

export function fetchEmployeesWithCheck(legalEntityId = null) {
  return (dispatch) => {
    axios
      .post('/employees/withCheck', {
        legalEntityId: legalEntityId,
      })
      .then((response) => {
        dispatch({
          payload: response,
          type: 'EMPLOYEES_FULFILLED_WITH_CHECK',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'EMPLOYEES_REJECTED_WITH_CHECK',
        });
      });
  };
}

export function fetchEmployee(id) {
  return (dispatch) => {
    axios
      .post(`/employees/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'EMPLOYEE_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'EMPLOYEE_REJECTED',
        });
      });
  };
}

export function deleteEmployee(id, organizationId) {
  return () => {
    axios
      .post(`/employees/softDelete/${id}`)
      .then(() => {
        alert('Сотрудник в архиве');
        history.pushState(null, null, `/lmk/organization/${organizationId}`);
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function restoreEmployee(id) {
  return () => {
    axios
      .post(`/employees/restore/${id}`)
      .then(() => {
        alert('Сотрудник восстановлен');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function forceDeleteEmployee(id) {
  return () => {
    axios
      .post(`/employees/forceDelete/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function addEmployeeResearches(formElement = null, employeeId) {
  return (dispatch) => {
    axios
      .post(
        `/employees/researches/store/${employeeId}`,
        new FormData(formElement),
      )
      .then(() => {
        alert('Даты исследования успешно сохранены');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'EMPLOYEE_RESEARCHES_ADD_REJECTED',
        });
      });
  };
}

export function fetchEmployeeResearches(id) {
  return (dispatch) => {
    axios
      .post(`/employees/researches/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'EMPLOYEE_RESEARCHES_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'EMPLOYEE_RESEARCHES_REJECTED',
        });
      });
  };
}

export function clearEmployeeResearches() {
  return (dispatch) => {
    dispatch({
      payload: [],
      type: 'EMPLOYEE_RESEARCHES_CLEAR',
    });
  };
}

export function clearEmployee() {
  return (dispatch) => {
    dispatch({
      payload: [],
      type: 'EMPLOYEE_CLEAR',
    });
  };
}

export function clearEmployees() {
  return (dispatch) => {
    dispatch({
      payload: [],
      type: 'EMPLOYEES_CLEAR',
    });
  };
}
