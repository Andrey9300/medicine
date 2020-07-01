import {AnyAction} from 'redux';

interface IState {
  errors: object;
  fetched: boolean;
  auditors: [];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  auditors: [],
};

export const auditorsReducer = (
  state = initialState,
  action: AnyAction,
): IState => {
  switch (action.type) {
    case 'AUDITORS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'AUDITORS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        auditors: action.payload.data.auditors,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
