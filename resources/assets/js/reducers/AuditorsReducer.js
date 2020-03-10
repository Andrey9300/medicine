const initialState = {
  errors: null,
  fetched: false,
  auditors: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AUDITORS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'AUDITORS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        auditors: action.payload.data.auditors,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
