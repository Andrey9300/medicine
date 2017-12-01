import axios from 'axios';
import {hashHistory} from 'react-router';

/**
 * Получить исследование
 *
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
 * Все исследования admin
 *
 * @returns {function(*)}
 */
export function fetchUserResearches() {
    return (dispatch) => {
        axios.post('/userResearches')
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'USER_RESEARCHES_FULFILLED'
                });
            })
            .catch((error) => {
                hashHistory.replace('login');
                dispatch({
                    payload: error,
                    type: 'USER_RESEARCHES_REJECTED'
                });
            });
    };
}

