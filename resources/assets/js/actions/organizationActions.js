import axios from 'axios';

export function addOrganization(formElement = null) {
    return (dispatch) => {
        axios.post('/organizations/store', new FormData(formElement))
            .then(() => {
                alert('Объект успешно создан');
                history.pushState(null, null, 'organizations');
            })
            .catch((errors) => {
                dispatch({
                    payload: errors.response.data.errors,
                    type: 'ORGANIZATION_ADD_REJECTED'
                });
            });
    };
}

export function editOrganization(formElement = null, legalEntityId) {
    return (dispatch) => {
        axios.post(`/organizations/update/${legalEntityId}`, new FormData(formElement))
            .then(() => {
                alert('Объект успешно отредактирован');
                history.pushState(null, null, `/organizations/${legalEntityId}`);
            })
            .catch((errors) => {
                dispatch({
                    payload: errors.response.data.errors,
                    type: 'ORGANIZATION_EDIT_REJECTED'
                });
            });
    };
}

/**
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
                history.replace(null, null, 'login');

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
                history.replace(null, null, 'login');

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
                history.pushState(null, null, '/organizations');
            })
            .catch((error) => {
                return error;
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
                history.pushState(null, null, `/organizations/${idOrganization}`);
            })
            .catch((error) => {
                return error;
            });
    };
}
