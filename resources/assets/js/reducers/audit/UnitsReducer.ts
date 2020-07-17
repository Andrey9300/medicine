import {AnyAction} from 'redux';
import {IUnit} from "../../interface/audit/IUnit";

interface IState {
  errors: object;
  fetched: boolean;
  unit: IUnit;
  units: IUnit[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  unit: null,
  units: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
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
