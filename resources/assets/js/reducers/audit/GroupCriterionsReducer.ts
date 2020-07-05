import {AnyAction} from 'redux';
import {IGroupCriterion} from "../../interface/audit/IGroupCriterion";

interface IState {
  errors: object;
  fetched: boolean;
  groupCriterion: IGroupCriterion;
  groupCriterions: IGroupCriterion[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  groupCriterion: null,
  groupCriterions: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'GROUP_CRITERION_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'GROUP_CRITERION_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'GROUP_CRITERIONS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'GROUP_CRITERIONS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        groupCriterions: action.payload.data.groupCriterions,
      };
    }
    case 'GROUP_CRITERION_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'GROUP_CRITERION_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        groupCriterion: action.payload.data.groupCriterion,
      };
    }
    case 'GROUP_CRITERION_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        groupCriterion: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
