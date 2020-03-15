const initialState = {
  errors: null,
  fetched: false,
  unit: null,
  units: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UNIT_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'UNIT_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'UNITS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'UNITS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        units: action.payload.data.units,
      };
    }
    case 'UNIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'UNIT_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        unit: action.payload.data.unit,
      };
    }
    case 'UNIT_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        unit: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
