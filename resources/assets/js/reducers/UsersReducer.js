const initialState = {
    error: null,
    fetched: false,
    user: null,
    userResearch: null,
    userResearches: [],
    users: []
};

/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER_REJECTED': {
            return {
                ...state,
                error: action.payload.response.data.errors,
                fetched: false
            };
        }
        case 'LOGIN_USER_FULFILLED': {
            return {
                ...state,
                fetched: true,
                user: {
                    isAuthenticated: action.payload.isAuthenticated
                }
            };
        }
        case 'LOGOUT_USER_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'REGISTRATION_USER_REJECTED': {
            return {
                ...state,
                error: action.payload.response.data.errors,
                fetched: false
            };
        }
        case 'REGISTRATION_USER_FULFILLED': {
            return {
                ...state,
                fetched: true,
                user: {
                    isAuthenticated: action.payload.isAuthenticated
                }
            };
        }
        case 'USERS_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'USERS_FULFILLED': {
            return {
                ...state,
                fetched: true,
                users: action.payload.data.users
            };
        }
        case 'USER_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'USER_FULFILLED': {
            return {
                ...state,
                fetched: true,
                user: action.payload.data.user
            };
        }
        default:
            return {
                ...state
            };
    }
}
