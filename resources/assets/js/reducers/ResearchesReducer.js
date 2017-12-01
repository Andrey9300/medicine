const initialState = {
    error: null,
    fetched: false,
    research: null,
    periods: [],
    researches: [],
    userResearches: []
};

/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'RESEARCHES_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'RESEARCHES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                researches: action.payload.data.researches
            };
        }
        case 'RESEARCH_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'RESEARCH_FULFILLED': {
            return {
                ...state,
                fetched: true,
                research: action.payload.data.research,
                periods: action.payload.data.periods
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
                userResearches: action.payload.data.userResearches
            };
        }
        default: return {
            ...state
        };
    }
}
