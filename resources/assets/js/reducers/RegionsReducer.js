const initialState = {
    error: null,
    fetched: false,
    regions: []
};

/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'REGIONS_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'REGIONS_FULFILLED': {
            return {
                ...state,
                fetched: true,
                regions: action.payload.data.regions
            };
        }
        default: return {
            ...state
        };
    }
}
