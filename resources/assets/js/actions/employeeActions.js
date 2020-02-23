import axios from 'axios';

/**
 * @returns {function(*)}
 */
export function addEmployee(formElement = null) {
  return (dispatch) => {
    axios
      .post('/employees/store', new FormData(formElement))
      .then(() => {
        alert('Сотрудник успешно создан');
        history.pushState(null, null, '/#/employees/');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: errors.response.data.errors,
          type: 'EMPLOYEE_ADD_REJECTED',
        });
      });
  };
}

/**
 * @returns {function(*)}
 */
export function editEmployee(formElement = null, employeeId) {
  return (dispatch) => {
    axios
      .post(`/employees/update/${employeeId}`, new FormData(formElement))
      .then(() => {
        alert('Сотрудник успешно отредактирован');
        history.pushState(null, null, `/#/employee/${employeeId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: errors.response.data.errors,
          type: 'EMPLOYEE_ADD_REJECTED',
        });
      });
  };
}

/**
 * Список сотрудников
 *
 * @returns {function(*)}
 */
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

/**
 * Получить сотрудника
 *
 * @param id
 * @returns {function(*)}
 */
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

/**
 * Сотрудника в архиве
 *
 * @param id number
 * @param organizationId number
 * @returns {Function}
 */
export function deleteEmployee(id, organizationId) {
  return () => {
    axios
      .post(`/employees/softDelete/${id}`)
      .then(() => {
        alert('Сотрудник в архиве');
        history.pushState(null, null, `/#/organization/${organizationId}`);
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

/**
 * Удалить сотрудника
 *
 * @param id number
 * @returns {Function}
 */
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

/**
 * @param formElement
 * @param employeeId
 * @returns {Function}
 */
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
          payload: errors.response.data.errors,
          type: 'EMPLOYEE_RESEARCHES_ADD_REJECTED',
        });
      });
  };
}

/**
 * Fetch
 * @param id - id сотрудника
 * @returns {function(*)}
 */
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
