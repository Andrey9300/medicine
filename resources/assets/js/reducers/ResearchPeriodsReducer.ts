import {AnyAction} from 'redux';

interface IState {
  error: object;
  fetched: boolean;
  researchPeriods: [];
}

const initialState: IState = {
  error: null,
  fetched: false,
  researchPeriods: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'RESEARCH_PERIODS_REJECTED': {
      return {
        ...state,
        error: action.payload,
        fetched: false,
      };
    }
    case 'RESEARCH_PERIODS_FULFILLED': {
      return {
        ...state,
        error: null,
        fetched: true,
        researchPeriods: action.payload.data.research_periods,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
