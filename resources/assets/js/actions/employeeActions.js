import axios from 'axios';
import {hashHistory} from 'react-router';

/**
 * Fetch
 * @returns {function(*)}
 */
export function fetchEmployees() {
    return (dispatch) => {
        axios.post('/employees')
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: 'EMPLOYEES_FULFILLED'
                });
            })
            .catch((error) => {
                hashHistory.replace('login');
                dispatch({
                    payload: error,
                    type: 'EMPLOYEES_REJECTED'
                });
            });
    };
}

/**
 * Fetch
 * @param id
 * @returns {function(*)}
 */
export function fetchEmployee(id) {
    return (dispatch) => {
        axios.post(`/employees/${id}`)
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'EMPLOYEE_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'EMPLOYEE_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param id number
 * @param organizationId number
 * @returns {Function}
 */
export function deleteEmployee(id, organizationId) {
    return () => {
        axios.post(`/employees/destroy/${id}`)
            .then(() => {
                hashHistory.push(`/organizations/${organizationId}`);
            })
            .catch((error) => {
                return error;
            });
    };
}

/**
 * Исследования сотрудников учреждений
 */

/**
 * Fetch
 * @param id - id мед учреждения
 * @returns {function(*)}
 */
export function fetchEmployeeResearches(id) {
    return (dispatch) => {
        axios.post(`/employees/researches/${id}`)
            .then((response) => {
                dispatch({
                    payload: response.data,
                    type: 'EMPLOYEE_RESEARCHES_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'EMPLOYEE_RESEARCHES_REJECTED'
                });
            });
    };
}

/**
 * Fetch
 * @param idEmployee, idResearch
 * @returns {function(*)}
 */
export function fetchEmployeeResearch(idEmployee, idResearch) {
    return (dispatch) => {
        axios.post(`/employees/researches/edit/${idEmployee}/${idResearch}`)
            .then((response) => {
                dispatch({
                    payload: response.data.employee_research,
                    type: 'EMPLOYEE_RESEARCH_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'EMPLOYEE_RESEARCH_REJECTED'
                });
            });
    };
}

/**
 * Delete
 * @param idEmployee number
 * @param idResearch number
 * @returns {Function}
 */
export function deleteEmployeeResearch(idEmployee, idResearch) {
    return (dispatch) => {
        axios.post(`/employees/researches/destroy/${idEmployee}/${idResearch}`)
            .then(() => {
                dispatch(fetchEmployeeResearches(idEmployee));
            })
            .catch((error) => {
                return error;
            });
    };
}
