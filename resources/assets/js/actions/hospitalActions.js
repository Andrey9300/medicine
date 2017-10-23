import {NotificationManager} from 'react-notifications';
import axios from 'axios';

/**
 * Fetch
 * @returns {function(*)}
 */
export function fetchHospitals() {
    return (dispatch) => {
        axios.post('/hospitals')
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: 'FETCH_HOSPITALS_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_HOSPITALS_REJECTED'
                });
            });
    };
}

/**
 * Fetch
 * @param id
 * @returns {function(*)}
 */
export function fetchHospital(id) {
    return (dispatch) => {
        axios.post(`/hospitals/${id}`)
            .then((response) => {
                dispatch({
                    payload: response.data.hospital,
                    type: 'FETCH_HOSPITAL_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_HOSPITAL_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param id number
 * @returns {Function}
 */
export function deleteHospital(id) {
    return (dispatch) => {
        axios.post(`/hospitals/destroy/${id}`)
            .then((response) => {
                NotificationManager.success(response.data.message, 'Success');
                dispatch(fetchHospitals());
            })
            .catch((error) => {
                NotificationManager.error('An error occured in the operation', 'Error', error);
            });
    };
}

/**
 * Исследования медицинских учреждений
 */

/**
 * Fetch
 * @param id - id мед учреждения
 * @returns {function(*)}
 */
export function fetchHospitalResearches(id) {
    return (dispatch) => {
        axios.post(`/hospitals/researches/${id}`)
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: 'FETCH_HOSPITAL_RESEARCHES_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_HOSPITAL_RESEARCHES_REJECTED'
                });
            });
    };
}

/**
 * Fetch
 * @param id_hospital, id_research
 * @returns {function(*)}
 */
export function fetchHospitalResearch(idHospital, idResearch) {
    return (dispatch) => {
        axios.post(`/hospitals/researches/edit/${idHospital}/${idResearch}`)
            .then((response) => {
                dispatch({
                    payload: response.data.hospital_research,
                    type: 'FETCH_HOSPITAL_RESEARCH_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_HOSPITAL_RESEARCH_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param id number
 * @returns {Function}
 */
export function deleteHospitalResearch(idHospital, idResearch) {
    return (dispatch) => {
        axios.post(`/hospitals/researches/destroy/${idHospital}/${idResearch}`)
            .then((response) => {
                NotificationManager.success(response.data.message, 'Success');
                dispatch(fetchHospitalResearches(idHospital));
            })
            .catch((error) => {
                NotificationManager.error('An error occured in the operation', 'Error', error);
            });
    };
}
