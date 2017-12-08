import axios from 'axios';
import {hashHistory} from 'react-router';

/**
 * Получить все организации начальника качества
 *
 * @returns {function(*)}
 */
export function fetchOrganizations(legalEntityId = null) {
    return (dispatch) => {
        axios.post('/organizations', {
            legalEntityId: legalEntityId
        })
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
 * Получить все организации начальника качества
 *
 * @returns {function(*)}
 */
export function fetchExpiredOrganizations(legalEntityId = null) {
    return (dispatch) => {
        axios.post('/organizations/expired', {
            legalEntityId: legalEntityId
        })
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'EXPIRED_ORGANIZATIONS_FULFILLED'
                });
            })
            .catch((error) => {
                hashHistory.replace('login');

                dispatch({
                    payload: error,
                    type: 'EXPIRED_ORGANIZATIONS_REJECTED'
                });
            });
    };
}

/**
 * Получить организацию
 *
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
 * Удалить организацию
 *
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
 * TODO Удалить сотрудника из организации
 *
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
