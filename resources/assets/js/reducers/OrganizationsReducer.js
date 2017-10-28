/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = {
    error: null,
    fetched: false,
    organization: null,
    organizationUsers: [],
    organizations: []
}, action
) {
    switch (action.type) {
        case 'FETCH_ORGANIZATIONS_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'FETCH_ORGANIZATIONS_FULFILLED': {
            return {
                ...state,
                fetched: true,
                organizations: action.payload.data.organizations
            };
        }
        case 'FETCH_ORGANIZATION_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'FETCH_ORGANIZATION_FULFILLED': {
            return {
                ...state,
                fetched: true,
                organization: action.payload
            };
        }
        case 'FETCH_ORGANIZATION_USERS_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'FETCH_ORGANIZATION_USERS_FULFILLED': {
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
