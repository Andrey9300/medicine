import {AnyAction} from 'redux';
import {IPlaceCheckList, IPlaceCheckListCriterion} from "../../interface/audit/IPlaceCheckList";

interface IState {
  errors: object;
  fetched: boolean;
  placeCheckList: IPlaceCheckList;
  placeCheckLists: IPlaceCheckList[];
  placeCheckListCriterions: IPlaceCheckListCriterion[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  placeCheckList: null,
  placeCheckLists: [],
  placeCheckListCriterions: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'PLACE_CHECK_LIST_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PLACE_CHECK_LIST_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PLACE_CHECK_LISTS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PLACE_CHECK_LISTS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        placeCheckLists: action.payload.data.placeCheckLists,
      };
    }
    case 'PLACE_CHECK_LIST_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PLACE_CHECK_LIST_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        placeCheckList: action.payload.data.placeCheckList,
      };
    }
    case 'PLACE_CHECK_LIST_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        placeCheckList: null,
      };
    }
    case 'PLACE_CHECK_LIST_CRITERIONS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'PLACE_CHECK_LIST_CRITERIONS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        placeCheckListCriterions: action.payload.data.placeCheckListCriterions,
      };
    }
    case 'PLACE_CHECK_LIST_CRITERIONS_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        placeCheckListCriterions: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
