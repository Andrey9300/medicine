import {NotificationManager} from 'react-notifications';
import axios from 'axios';

/**
 * Fetch
 * @returns {function(*)}
 */
export function fetchResearches() {
    return (dispatch) => {
        axios.post('/researches')
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'FETCH_RESEARCHES_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_RESEARCHES_REJECTED'
                });
            });
    };
}

/**
 * Fetch
 * @param id
 * @returns {function(*)}
 */
export function fetchResearch(id) {
    return (dispatch) => {
        axios.post(`/researches/${id}`)
            .then((response) => {
                dispatch({
                    payload: response.data.research,
                    type: 'FETCH_RESEARCH_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_RESEARCH_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param id number
 * @returns {Function}
 */
export function deleteResearch(id) {
    return (dispatch) => {
        axios.post(`/researches/destroy/${id}`)
            .then((response) => {
                NotificationManager.success(response.data.message, 'Success');
                dispatch(fetchResearches());
            })
            .catch((error) => {
                NotificationManager.error('An error occured in the operation', 'Error', error);
            });
    };
}
