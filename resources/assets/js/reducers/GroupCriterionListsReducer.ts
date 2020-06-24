import {AnyAction} from 'redux';

interface IState {
  errors: object;
  fetched: boolean;
  groupCriterionList: object;
  groupCriterionLists: [];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  groupCriterionList: null,
  groupCriterionLists: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'GROUP_CRITERION_LIST_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'GROUP_CRITERION_LIST_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'GROUP_CRITERION_LISTS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'GROUP_CRITERION_LISTS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        groupCriterionLists: action.payload.data.groupCriterionLists,
      };
    }
    case 'GROUP_CRITERION_LIST_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'GROUP_CRITERION_LIST_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        groupCriterionList: action.payload.data.groupCriterionList,
      };
    }
    case 'GROUP_CRITERION_LIST_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        groupCriterionList: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
