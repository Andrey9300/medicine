/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = {
    error: null,
    fetched: false,
    hospital: null,
    hospitals: []
}, action
) {
    switch (action.type) {
        case 'FETCH_HOSPITALS_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'FETCH_HOSPITALS_FULFILLED': {
            return {
                ...state,
                fetched: true,
                hospitals: action.payload.data.hospitals,
            };
        }
        case 'FETCH_HOSPITAL_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'FETCH_HOSPITAL_FULFILLED': {
            return {
                ...state,
                fetched: true,
                hospital: action.payload
            };
        }
        default: return {
            ...state
        };
    }
}
