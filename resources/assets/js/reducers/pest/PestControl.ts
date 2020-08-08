import {AnyAction} from 'redux';
import {IPestControl, IPestControlCriterion} from "../../interface/pest/IPestControl";

interface IState {
  errors: object;
  fetched: boolean;
  pestControl: IPestControl;
  pestControlCriteria: IPestControlCriterion[];
  pestControls: IPestControl[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  pestControl: null,
  pestControlCriteria: [],
  pestControls: [],
};

export const pestControl = (
  state = initialState,
  action: AnyAction,
): IState => {
  switch (action.type) {
    case 'PEST_CONTROL_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_CONTROL_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_CONTROLS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_CONTROLS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestControls: action.payload.data.pestControls,
      };
    }
    case 'PEST_CONTROL_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PEST_CONTROL_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestControlCriteria: action.payload.data.pestControlCriteria,
        pestControl: action.payload.data.pestControl,
      };
    }
    case 'PEST_CONTROL_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        pestControl: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
