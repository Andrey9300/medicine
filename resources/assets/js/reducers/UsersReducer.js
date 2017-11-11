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
                error: action.payload,
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
        case 'LOGOUT_USER_FULFILLED': {
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
                users: action.payload.users
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
                user: action.payload
            };
        }
        case 'USER_RESEARCHES_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'USER_RESEARCHES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                userResearches: action.payload.user_researches
            };
        }
        case 'USER_RESEARCH_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'USER_RESEARCH_FULFILLED': {
            return {
                ...state,
                fetched: true,
                userResearch: action.payload
            };
        }
        default:
            return {
                ...state
            };
    }
}
