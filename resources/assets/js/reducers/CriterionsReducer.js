const initialState = {
  errors: null,
  fetched: false,
  criterion: null,
  criterions: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CRITERION_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'CRITERION_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'CRITERIONS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'CRITERIONS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        criterions: action.payload.data.criterions,
      };
    }
    case 'CRITERION_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'CRITERION_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        criterion: action.payload.data.criterion,
      };
    }
    case 'CRITERION_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        criterion: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
