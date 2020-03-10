const initialState = {
  errors: null,
  fetched: false,
  location: null,
  locations: [],
};

/**
 * Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOCATION_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'LOCATION_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'LOCATIONS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'LOCATIONS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        locations: action.payload.data.locations,
      };
    }
    case 'LOCATION_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'LOCATION_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        location: action.payload.data.location,
      };
    }
    case 'LOCATION_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        location: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
