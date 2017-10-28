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
    hospitalResearch: null,
    hospitalResearches: [],
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
                hospitals: action.payload.hospitals
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
        case 'FETCH_HOSPITAL_RESEARCHES_REJECTED': {
            return {
                ...state,
                fetched: true,
                hospital: action.payload
            };
        }
        case 'FETCH_HOSPITAL_RESEARCHES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                hospitalResearches: action.payload.hospital_researches
            };
        }
        case 'FETCH_HOSPITAL_RESEARCH_REJECTED': {
            return {
                ...state,
                fetched: true,
                hospital: action.payload
            };
        }
        case 'FETCH_HOSPITAL_RESEARCH_FULFILLED': {
            return {
                ...state,
                fetched: true,
                hospitalResearch: action.payload
            };
        }
        default: return {
            ...state
        };
    }
}
