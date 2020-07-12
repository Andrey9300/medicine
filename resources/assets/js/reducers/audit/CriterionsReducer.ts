import {AnyAction} from 'redux';
import {ICriterion} from "../../interface/audit/ICriterion";

interface IState {
  errors: object;
  fetched: boolean;
  criterion: ICriterion;
  criterions: ICriterion[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  criterion: null,
  criterions: [],
};

// отдельные критерии
export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
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
