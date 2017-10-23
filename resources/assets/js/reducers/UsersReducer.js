/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = {
    error: null,
    fetched: false,
    user: null,
    userResearch: null,
    userResearches: [],
    users: []

}, action
) {
    switch (action.type) {
        case 'FETCH_USERS_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'FETCH_USERS_FULFILLED': {
            return {
                ...state,
                fetched: true,
                users: action.payload.users
            };
        }
        case 'FETCH_USER_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'FETCH_USER_FULFILLED': {
            return {
                ...state,
                fetched: true,
                user: action.payload
            };
        }
        case 'FETCH_USER_RESEARCHES_REJECTED': {
            return {
                ...state,
                fetched: true,
                user: action.payload
            };
        }
        case 'FETCH_USER_RESEARCHES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                userResearches: action.payload.user_researches
            };
        }
        case 'FETCH_USER_RESEARCH_REJECTED': {
            return {
                ...state,
                fetched: true,
                user: action.payload
            };
        }
        case 'FETCH_USER_RESEARCH_FULFILLED': {
            return {
                ...state,
                fetched: true,
                userResearch: action.payload
            };
        }
        default: return {
            ...state
        };
    }
}
