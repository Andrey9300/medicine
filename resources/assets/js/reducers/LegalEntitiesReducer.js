const initialState = {
    error: null,
    fetched: false,
    legalEntityCommonInfo: {
        user: null,
        legalEntity: null,
        organizations: null,
        countOrganizationsWithResearchProblems: null,
        hospitals: null,
        employees: null,
        employeesResearchesEnds: null,
        employeesResearchesExpired: null
    },
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
                legalEntities: action.payload.data.legalEntities
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
                legalEntity: action.payload.data.legalEntity
            };
        }
        case 'LEGAL_ENTITY_COMMON_INFO_REJECTED': {
            return {
                ...state,
                error: action.payload,
                fetched: false
            };
        }
        case 'LEGAL_ENTITY_COMMON_INFO_FULFILLED': {
            return {
                ...state,
                fetched: true,
                legalEntityCommonInfo: {
                    user: action.payload.data.user,
                    legalEntity: action.payload.data.legalEntity,
                    organizations: action.payload.data.organizations,
                    countOrganizationsWithResearchProblems: action.payload.data.countOrganizationsWithResearchProblems,
                    hospitals: action.payload.data.hospitals,
                    employees: action.payload.data.employees,
                    employeesResearchesEnds: action.payload.data.employeesResearchesEnds,
                    employeesResearchesExpired: action.payload.data.employeesResearchesExpired
                }
            };
        }
        default: return {
            ...state
        };
    }
}
