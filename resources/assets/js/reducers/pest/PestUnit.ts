import {AnyAction} from 'redux';
import {IPestUnit} from "../../interface/pest/IPestUnit";

interface IState {
  errors: object;
  fetched: boolean;
  pestUnit: IPestUnit;
  pestUnits: IPestUnit[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  pestUnit: null,
  pestUnits: [],
};

export const pestUnit = (
  state = initialState,
  action: AnyAction,
): IState => {
  switch (action.type) {
    case 'PEST_UNIT_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_UNIT_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_UNITS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_UNITS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestUnits: action.payload.data.pestUnits,
      };
    }
    case 'PEST_UNIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_UNIT_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestUnit: action.payload.data.pestUnit,
      };
    }
    case 'PEST_UNIT_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestUnit: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
