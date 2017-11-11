const initialState = {
    error: null,
    fetched: false,
    organization: null,
    organizationUsers: [],
    organizations: []
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
                organization: action.payload
            };
        }
        case 'ORGANIZATION_USERS_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'ORGANIZATION_USERS_FULFILLED': {
            return {
                ...state,
                fetched: true,
                organizationUsers: action.payload.organization_users
            };
        }
        default: return {
            ...state
        };
    }
}
