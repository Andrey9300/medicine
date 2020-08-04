import axios from 'axios';
import {getResponseError} from '../../utils/errorsHelper';

export function addEmployee(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/employees/store', new FormData(formElement))
      .then(() => {
        alert('Сотрудник успешно создан');
        history.pushState(null, null, '/services/lmk/employees/');
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

export function editEmployee(
  formElement: HTMLFormElement = null,
  employeeId: number,
) {
  return (dispatch: any) => {
    axios
      .post(`/employees/update/${employeeId}`, new FormData(formElement))
      .then(() => {
        alert('Сотрудник успешно отредактирован');
        history.pushState(null, null, `/services/lmk/employee/${employeeId}`);
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

export function sendToResearch(employeeId: number) {
  return () => {
    axios
      .post(`/employees/sendToResearch/${employeeId}`)
      .then(() => {
        alert('Сотрудник отправлен на МО');
      })
      .catch((errors) => {
        console.error(errors);
      });
  };
}

export function fetchEmployees(legalEntityId: number = null) {
  return (dispatch: any) => {
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

export function fetchEmployeesWithCheck(legalEntityId: number = null) {
  return (dispatch: any) => {
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

export function fetchEmployee(id: number) {
  return (dispatch: any) => {
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

export function deleteEmployee(id: number, organizationId: number) {
  return () => {
    axios
      .post(`/employees/softDelete/${id}`)
      .then(() => {
        alert('Сотрудник в архиве');
        history.pushState(
          null,
          null,
          `/services/lmk/organization/${organizationId}`,
        );
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

export function restoreEmployee(id: number) {
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

export function forceDeleteEmployee(id: number) {
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

export function addEmployeeResearches(
  formElement: HTMLFormElement = null,
  employeeId: number,
) {
  return (dispatch: any) => {
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
        alert('Произошла ошибка, проверьте данные и попробуйте снова');
        dispatch({
          payload: getResponseError(errors),
          type: 'EMPLOYEE_RESEARCHES_ADD_REJECTED',
        });
      });
  };
}

export function fetchEmployeeResearches(id: number) {
  return (dispatch: any) => {
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
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'EMPLOYEE_RESEARCHES_CLEAR',
    });
  };
}

export function clearEmployee() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'EMPLOYEE_CLEAR',
    });
  };
}

export function clearEmployees() {
  return (dispatch: any) => {
    dispatch({
      payload: [],
      type: 'EMPLOYEES_CLEAR',
    });
  };
}
