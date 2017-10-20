/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = {
    error: null,
    fetched: false,
    research: null,
    researches: []
}, action
) {
    switch (action.type) {
        case 'FETCH_RESEARCHES_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'FETCH_RESEARCHES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                researches: action.payload.data.researches
            };
        }
        case 'FETCH_RESEARCH_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'FETCH_RESEARCH_FULFILLED': {
            return {
                ...state,
                fetched: true,
                research: action.payload
            };
        }
        default: return {
            ...state
        };
    }
}
