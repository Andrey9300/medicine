const initialState = {
  error: null,
  fetched: false,
  researchPeriods: [],
};

/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'RESEARCH_PERIODS_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'RESEARCH_PERIODS_FULFILLED': {
      return {
        ...state,
        error: null,
        fetched: true,
        researchPeriods: action.payload.data.research_periods,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
