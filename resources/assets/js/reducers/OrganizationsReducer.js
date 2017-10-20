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
        default: return {
            ...state
        };
    }
}
