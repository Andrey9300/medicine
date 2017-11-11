import axios from 'axios';
import {hashHistory} from 'react-router';

/**
 * Fetch hospitals to bd
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
                dispatch({
                    payload: error,
                    type: 'HOSPITALS_REJECTED'
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
 * Delete
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
                    type: 'HOSPITAL_RESEARCH_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'HOSPITAL_RESEARCH_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param idHospital number
 * @param idResearch number
 * @returns {Function}
 */
export function deleteHospitalResearch(idHospital, idResearch) {
    return () => {
        axios.post(`/hospitals/researches/destroy/${idHospital}/${idResearch}`)
            .then(() => {
                hashHistory.push(`/hospitals/${idHospital}`);
            })
            .catch((error) => {
                return error;
            });
    };
}
