const initialState = {
    error: null,
    fetched: false,
    categories: []
};

/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CATEGORIES_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'CATEGORIES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                categories: action.payload.data.categories
            };
        }
        default: return {
            ...state
        };
    }
}
