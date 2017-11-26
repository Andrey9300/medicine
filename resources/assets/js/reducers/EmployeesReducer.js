const initialState = {
    error: null,
    fetched: false,
    employee: null,
    employeeResearch: null,
    employeeResearches: [],
    employees: [],
    deleted: [],
    withoutOrganization: []
};

/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'EMPLOYEES_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'EMPLOYEES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                employees: action.payload.employees,
                deleted: action.payload.deleted,
                withoutOrganization: action.payload.withoutOrganization
            };
        }
        case 'EMPLOYEE_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'EMPLOYEE_FULFILLED': {
            return {
                ...state,
                fetched: true,
                employee: action.payload.data.employee
            };
        }
        case 'EMPLOYEE_RESEARCHES_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'EMPLOYEE_RESEARCHES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                employeeResearches: action.payload.employee_researches
            };
        }
        case 'EMPLOYEE_RESEARCH_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'EMPLOYEE_RESEARCH_FULFILLED': {
            return {
                ...state,
                fetched: true,
                employeeResearch: action.payload
            };
        }
        default:
            return {
                ...state
            };
    }
}
