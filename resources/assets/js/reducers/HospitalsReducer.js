const initialState = {
    error: null,
    fetched: false,
    hospital: null,
    hospitalResearch: null,
    hospitalResearches: [],
    hospitals: []
};

/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'HOSPITALS_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'HOSPITALS_FULFILLED': {
            return {
                ...state,
                fetched: true,
                hospitals: action.payload.hospitals
            };
        }
        case 'HOSPITAL_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'HOSPITAL_FULFILLED': {
            return {
                ...state,
                fetched: true,
                hospital: action.payload
            };
        }
        case 'HOSPITAL_RESEARCHES_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'HOSPITAL_RESEARCHES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                hospitalResearches: action.payload.hospital_researches
            };
        }
        case 'HOSPITAL_RESEARCH_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'HOSPITAL_RESEARCH_FULFILLED': {
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
