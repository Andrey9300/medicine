import axios from 'axios';
import {hashHistory} from 'react-router';

/**
 * Все медицинские организации
 *
 * @returns {function(*)}
 */
export function fetchHospitals() {
    return (dispatch) => {
        axios.post('/hospitals')
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: 'HOSPITALS_FULFILLED'
                });
            })
            .catch((error) => {
                hashHistory.replace('login');
                dispatch({
                    payload: error,
                    type: 'HOSPITALS_REJECTED'
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
export function fetchHospital(id) {
    return (dispatch) => {
        axios.post(`/hospitals/${id}`)
            .then((response) => {
                dispatch({
                    payload: response.data.hospital,
                    type: 'HOSPITAL_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'HOSPITAL_REJECTED'
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
export function deleteHospital(id) {
    return () => {
        axios.post(`/hospitals/destroy/${id}`)
            .then(() => {
                hashHistory.push('/hospitals');
            })
            .catch((error) => {
                return error;
            });
    };
}

/**
 * TODO Исследования медицинских учреждений
 */

/**
 * Вывести все исследования для категорий организаций
 * @param id - id мед учреждения
 * @returns {function(*)}
 */
export function fetchHospitalResearches() {
    return (dispatch) => {
        axios.post('/researches/onCategories')
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'HOSPITAL_RESEARCHES_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'HOSPITAL_RESEARCHES_REJECTED'
                });
            });
    };
}

