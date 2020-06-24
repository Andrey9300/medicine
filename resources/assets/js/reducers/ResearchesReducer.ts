import {AnyAction} from 'redux';

interface IState {
  error: object;
  fetched: boolean;
  research: object;
  periods: [];
  researches: [];
  userResearches: [];
}

const initialState: IState = {
  error: null,
  fetched: false,
  research: null,
  periods: [],
  researches: [],
  userResearches: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'RESEARCHES_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'RESEARCHES_FULFILLED': {
      return {
        ...state,
        error: null,
        fetched: true,
        researches: action.payload.data.researches,
      };
    }
    case 'RESEARCH_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'RESEARCH_FULFILLED': {
      return {
        ...state,
        error: null,
        fetched: true,
        research: action.payload.data.research,
        periods: action.payload.data.periods,
      };
    }
    case 'USER_RESEARCHES_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'USER_RESEARCHES_FULFILLED': {
      return {
        ...state,
        error: null,
        fetched: true,
        userResearches: action.payload.data.userResearches,
      };
    }
    case 'ADD_USER_RESEARCH_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
