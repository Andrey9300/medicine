import {AnyAction} from 'redux';

interface IState {
  error: object;
  fetched: boolean;
  categories: [];
}

const initialState: IState = {
  error: null,
  fetched: false,
  categories: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'CATEGORIES_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'CATEGORIES_FULFILLED': {
      return {
        ...state,
        error: null,
        fetched: true,
        categories: action.payload.data.categories,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
