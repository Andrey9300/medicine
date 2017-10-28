import {NotificationManager} from 'react-notifications';
import axios from 'axios';

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
                    type: 'FETCH_ORGANIZATIONS_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_ORGANIZATIONS_REJECTED'
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
                    type: 'FETCH_ORGANIZATION_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_ORGANIZATION_REJECTED'
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
    return (dispatch) => {
        axios.post(`/organizations/destroy/${id}`)
            .then((response) => {
                NotificationManager.success(response.data.message, 'Success');
                dispatch(fetchOrganizations());
            })
            .catch((error) => {
                NotificationManager.error('An error occured in the operation', 'Error', error);
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
                    type: 'FETCH_ORGANIZATION_USERS_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'FETCH_ORGANIZATION_USERS_REJECTED'
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
    return (dispatch) => {
        axios.post(`/organizations/users/destroy/${idOrganization}/${idUser}`)
            .then((response) => {
                NotificationManager.success(response.data.message, 'Success');
                dispatch(fetchOrganizationUsers(idOrganization));
            })
            .catch((error) => {
                NotificationManager.error('An error occured in the operation', 'Error', error);
            });
    };
}
