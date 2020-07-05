import {AnyAction} from 'redux';
import {ICriterionList} from "../../interface/audit/ICriterionList";

interface IState {
  errors: object;
  fetched: boolean;
  criterionList: ICriterionList;
  criterionLists: ICriterionList[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  criterionList: null,
  criterionLists: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'CRITERION_LIST_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'CRITERION_LIST_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'CRITERION_LISTS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'CRITERION_LISTS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        criterionLists: action.payload.data.criterionLists,
      };
    }
    case 'CRITERION_LIST_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'CRITERION_LIST_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        criterionList: action.payload.data.criterionList,
      };
    }
    case 'CRITERION_LIST_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        criterionList: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
