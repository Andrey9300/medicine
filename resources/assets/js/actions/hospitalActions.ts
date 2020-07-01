import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addHospital(formElement: HTMLFormElement = null) {
  return (dispatch: any) => {
    axios
      .post('/hospitals/store', new FormData(formElement))
      .then(() => {
        history.pushState(null, null, '/services/lmk/hospitals');
        window.location.reload();
      })
      .catch((error) => {
        let {errors} = error.response.data;

        if (error.response.status === 403) {
          const forbidden: any = [];
          const access = [];

          access.push('У вас нет прав');
          forbidden.access = access;
          errors = forbidden;
        }

        dispatch({
          payload: getResponseError(errors),
          type: 'ADD_REJECTED',
        });
      });
  };
}

export function editHospital(
  formElement: HTMLFormElement = null,
  hospitalId: number,
) {
  return (dispatch: any) => {
    axios
      .post(`/hospitals/update/${hospitalId}`, new FormData(formElement))
      .then(() => {
        alert('Медицинское учреждение успешно отредактировано');
        history.pushState(null, null, `/services/lmk/hospital/${hospitalId}`);
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: getResponseError(errors),
          type: 'EDIT_REJECTED',
        });
      });
  };
}

/**
 * Все медицинские организации
 *
 * @returns {function(*)}
 */
export function fetchHospitals() {
  return (dispatch: any) => {
    axios
      .post('/hospitals')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'HOSPITALS_FULFILLED',
        });
      })
      .catch((error) => {
        history.replaceState(null, null, '/services/login');
        window.location.reload();
        dispatch({
          payload: error,
          type: 'HOSPITALS_REJECTED',
        });
      });
  };
}

/**
 * Получить медицинскую организацию
 *
 * @param id
 * @returns {function(*)}
 */
export function fetchHospital(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/hospitals/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'HOSPITAL_FULFILLED',
        });
      })
      .catch((error) => {
        history.replaceState(null, null, '/services/login');
        window.location.reload();
        dispatch({
          payload: error,
          type: 'HOSPITAL_REJECTED',
        });
      });
  };
}

/**
 * Удалить медицинскую организацию
 *
 * @param id number
 * @returns {Function}
 */
export function deleteHospital(id: number) {
  return () => {
    axios
      .post(`/hospitals/destroy/${id}`)
      .then(() => {
        history.pushState(null, null, '/services/lmk/hospitals');
        window.location.reload();
      })
      .catch((error) => {
        return error;
      });
  };
}

/**
 * Медицинские ииследования для мед учреждения
 * TODO выделить в отдельный action по мере роста
 */

export function fetchHospitalResearches(id: number) {
  return (dispatch: any) => {
    axios
      .post(`/hospitals/researches/${id}`)
      .then((response) => {
        dispatch({
          payload: response,
          type: 'HOSPITAL_RESEARCHES_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'HOSPITAL_RESEARCHES_REJECTED',
        });
      });
  };
}

export function addHospitalResearches(
  formElement: HTMLFormElement = null,
  hospitalId: number,
) {
  return (dispatch: any) => {
    axios
      .post(
        `/hospitals/researches/store/${hospitalId}`,
        new FormData(formElement),
      )
      .then(() => {
        alert('Изменения сохранены');
        window.location.reload();
      })
      .catch((errors) => {
        dispatch({
          payload: errors,
          type: 'STORE_RESEARCHES_REJECTED',
        });
      });
  };
}
