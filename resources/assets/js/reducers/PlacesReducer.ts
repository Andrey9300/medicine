import {AnyAction} from 'redux';

interface IState {
  errors: object;
  fetched: boolean;
  place: object;
  places: [];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  place: null,
  places: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'PLACE_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PLACE_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PLACES_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PLACES_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        places: action.payload.data.places,
      };
    }
    case 'PLACE_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PLACE_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        place: action.payload.data.place,
      };
    }
    case 'PLACE_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        place: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
