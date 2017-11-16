import axios from 'axios';
import {hashHistory} from 'react-router';

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
                    type: 'RESEARCHES_FULFILLED'
                });
            })
            .catch((error) => {
                hashHistory.replace('login');
                dispatch({
                    payload: error,
                    type: 'RESEARCHES_REJECTED'
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
                    payload: response,
                    type: 'RESEARCH_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'RESEARCH_REJECTED'
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
    return () => {
        axios.post(`/researches/destroy/${id}`)
            .then(() => {
                hashHistory.push('/researches');
            })
            .catch((error) => {
                alert('Ошибка удаления: эти данные используются', error);
            });
    };
}
