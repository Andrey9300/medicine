import axios from 'axios';
import {hashHistory} from 'react-router';

/**
 * Все юридические лица
 *
 * @returns {function(*)}
 */
export function fetchLegalEntities() {
    return (dispatch) => {
        axios.post('/legalEntities')
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'LEGAL_ENTITIES_FULFILLED'
                });
            })
            .catch((error) => {
                hashHistory.replace('login');
                dispatch({
                    payload: error,
                    type: 'LEGAL_ENTITIES_REJECTED'
                });
            });
    };
}

/**
 * Получить юридическое лицо
 *
 * @param id
 * @returns {function(*)}
 */
export function fetchLegalEntity(id) {
    return (dispatch) => {
        axios.post(`/legalEntities/${id}`)
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'LEGAL_ENTITY_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'LEGAL_ENTITY_REJECTED'
                });
            });
    };
}

/**
 * Удалить юридическое лицо
 *
 * @param id number
 * @returns {Function}
 */
export function deleteLegalEntity(id) {
    return () => {
        axios.post(`/legalEntities/destroy/${id}`)
            .then(() => {
                hashHistory.push('/legalEntities');
            })
            .catch((error) => {
                return error;
            });
    };
}
