const initialState = {
    error: null,
    fetched: false,
    legalEntity: null,
    legalEntities: []
};

/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LEGAL_ENTITIES_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'LEGAL_ENTITIES_FULFILLED': {
            return {
                ...state,
                fetched: true,
                legalEntities: action.payload.data.legal_entities
            };
        }
        case 'LEGAL_ENTITY_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'LEGAL_ENTITY_FULFILLED': {
            return {
                ...state,
                fetched: true,
                legalEntity: action.payload.data.legal_entity
            };
        }
        default: return {
            ...state
        };
    }
}
