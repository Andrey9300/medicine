const initialState = {
    error: null,
    fetched: false,
    organization: null,
    organizations: [],
    expired: [],
    organizationEmployees: []
};

/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ORGANIZATIONS_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'ORGANIZATIONS_FULFILLED': {
            return {
                ...state,
                fetched: true,
                organizations: action.payload.data.organizations
            };
        }
        case 'EXPIRED_ORGANIZATIONS_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'EXPIRED_ORGANIZATIONS_FULFILLED': {
            return {
                ...state,
                fetched: true,
                expired: action.payload.data.expired
            };
        }
        case 'ORGANIZATION_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'ORGANIZATION_FULFILLED': {
            return {
                ...state,
                fetched: true,
                organization: action.payload.data.organization
            };
        }
        case 'ORGANIZATION_EMPLOYEES_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'ORGANIZATION_EMPLOYEES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                organizationEmployees: action.payload.data.organization_employees
            };
        }
        default: return {
            ...state
        };
    }
}
