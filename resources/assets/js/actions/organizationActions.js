import axios from 'axios';
import {hashHistory} from 'react-router';

/**
 * Fetch
 * @returns {function(*)}
 */
export function fetchOrganizations() {
    return (dispatch) => {
        axios.post('/organizations')
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'ORGANIZATIONS_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'ORGANIZATIONS_REJECTED'
                });
            });
    };
}

/**
 * Fetch
 * @param id
 * @returns {function(*)}
 */
export function fetchOrganization(id) {
    return (dispatch) => {
        axios.post(`/organizations/${id}`)
            .then((response) => {
                dispatch({
                    payload: response.data.organization,
                    type: 'ORGANIZATION_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'ORGANIZATION_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param id number
 * @returns {Function}
 */
export function deleteOrganization(id) {
    return () => {
        axios.post(`/organizations/destroy/${id}`)
            .then(() => {
                hashHistory.push('/organizations');
            })
            .catch((error) => {
                return error;
            });
    };
}


/**
 * Сотрудники организации
 */

/**
 *
 * @param idOrganization - id организации
 * @returns {function(*)}
 */
export function fetchOrganizationUsers(idOrganization) {
    return (dispatch) => {
        axios.post(`/organizations/users/${idOrganization}`)
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: 'ORGANIZATION_USERS_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'ORGANIZATION_USERS_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param idOrganization number
 * @param idUser number
 * @returns {Function}
 */
export function deleteOrganizationUser(idOrganization, idUser) {
    return () => {
        axios.post(`/organizations/users/destroy/${idOrganization}/${idUser}`)
            .then(() => {
                hashHistory.push(`/organizations/${idOrganization}`);
            })
            .catch((error) => {
                return error;
            });
    };
}
