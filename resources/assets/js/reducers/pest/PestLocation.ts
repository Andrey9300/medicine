import {AnyAction} from 'redux';
import {IPestLocation} from "../../interface/pest/IPestLocation";

interface IState {
  errors: object;
  fetched: boolean;
  pestLocation: IPestLocation;
  pestLocations: IPestLocation[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  pestLocation: null,
  pestLocations: [],
};

export const pestLocation = (
  state = initialState,
  action: AnyAction,
): IState => {
  switch (action.type) {
    case 'PEST_LOCATION_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_LOCATION_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_LOCATIONS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_LOCATIONS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestLocations: action.payload.data.pestLocations,
      };
    }
    case 'PEST_LOCATION_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_LOCATION_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestLocation: action.payload.data.pestLocation,
      };
    }
    case 'PEST_LOCATION_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestLocation: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
