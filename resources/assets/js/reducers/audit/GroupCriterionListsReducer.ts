import {AnyAction} from 'redux';
import {
  IGroupCriterion,
  IGroupCriterionList,
} from '../../interface/audit/IGroupCriterion';
import {ICriterion} from '../../interface/audit/ICriterion';

interface IState {
  errors: object;
  fetched: boolean;
  criterions: ICriterion[];
  groupCriterionList: IGroupCriterion;
  groupCriterionLists: IGroupCriterionList[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  criterions: [],
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
        criterions: action.payload.data.criterions,
        groupCriterionList: action.payload.data.groupCriterion,
      };
    }
    case 'GROUP_CRITERION_LIST_CLEAR': {
      return {
        ...state,
        ...initialState,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
