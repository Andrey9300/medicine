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
                hashHistory.replace('login');

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
                    payload: response,
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
export function fetchOrganizationEmployees(idOrganization) {
    return (dispatch) => {
        axios.post(`/organizations/employees/${idOrganization}`)
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'ORGANIZATION_EMPLOYEES_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'ORGANIZATION_EMPLOYEE_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param idOrganization number
 * @param idEmployee number
 * @returns {Function}
 */
export function deleteOrganizationEmployee(idOrganization, idEmployee) {
    return () => {
        axios.post(`/organizations/employees/destroy/${idOrganization}/${idEmployee}`)
            .then(() => {
                hashHistory.push(`/organizations/${idOrganization}`);
            })
            .catch((error) => {
                return error;
            });
    };
}
