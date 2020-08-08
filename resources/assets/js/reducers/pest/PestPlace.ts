import {AnyAction} from 'redux';
import {IPestPlace} from "../../interface/pest/IPestPlace";

interface IState {
  errors: object;
  fetched: boolean;
  pestPlace: IPestPlace;
  pestPlaces: IPestPlace[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  pestPlace: null,
  pestPlaces: [],
};

export const pestPlace = (
  state = initialState,
  action: AnyAction,
): IState => {
  switch (action.type) {
    case 'PEST_PLACE_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_PLACE_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_PLACES_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_PLACES_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestPlaces: action.payload.data.pestPlaces,
      };
    }
    case 'PEST_PLACE_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_PLACE_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestPlace: action.payload.data.pestPlace,
      };
    }
    case 'PEST_PLACE_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestPlace: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
