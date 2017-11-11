const initialState = {
    error: null,
    fetched: false,
    research: null,
    researches: []
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
                research: action.payload
            };
        }
        default: return {
            ...state
        };
    }
}
