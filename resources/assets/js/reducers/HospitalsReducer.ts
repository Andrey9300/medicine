import {AnyAction} from 'redux';

interface IState {
  error: object;
  fetched: boolean;
  hospital: object;
  hospitalResearches: [];
  hospitals: [];
}

const initialState: IState = {
  error: null,
  fetched: false,
  hospital: null,
  hospitalResearches: [],
  hospitals: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'ADD_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'EDIT_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'HOSPITALS_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'HOSPITALS_FULFILLED': {
      return {
        ...state,
        error: null,
        fetched: true,
        hospitals: action.payload.data.hospitals,
      };
    }
    case 'HOSPITAL_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'HOSPITAL_FULFILLED': {
      return {
        ...state,
        error: null,
        fetched: true,
        hospital: action.payload.data.hospital,
      };
    }

    /**
     * Медицинские ииследования для мед учреждения
     * TODO выделить в отдельный action по мере роста
     */

    case 'STORE_RESEARCHES_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'HOSPITAL_RESEARCHES_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'HOSPITAL_RESEARCHES_FULFILLED': {
      return {
        ...state,
        error: null,
        fetched: true,
        hospitalResearches: action.payload.data.hospitalResearches,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
