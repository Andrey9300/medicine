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
                    payload: response,
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
