import {AnyAction} from 'redux';
import {IUser} from '../interface/IUser';

interface IState {
  errors: object;
  fetched: boolean;
  doubleClick: boolean;
  currentUser: {
    isAuthenticated: boolean;
  };
  user: IUser;
  userResearch: object;
  userResearches: [];
  users: IUser[];
}


const initialState: IState = {
  errors: null,
  fetched: false,
  doubleClick: false,
  currentUser: null,
  user: null,
  userResearch: null,
  userResearches: [],
  users: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'LOGIN_USER_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'LOGIN_USER_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        currentUser: {
          isAuthenticated: action.payload.isAuthenticated,
        },
      };
    }
    case 'LOGIN_USER_CLEAR_ERRORS': {
      return {
        ...state,
        errors: null,
        fetched: false,
      };
    }
    case 'LOGOUT_USER_FULFILLED': {
      return initialState;
    }
    case 'LOGOUT_USER_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'REGISTRATION_USER_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        doubleClick: false,
        fetched: false,
      };
    }
    case 'USERS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'USERS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        users: action.payload.data.users,
      };
    }
    case 'CURRENT_USER_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
        currentUser: {
          ...state.currentUser,
          isAuthenticated: false,
        },
      };
    }
    case 'CURRENT_USER_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        currentUser: {
          ...state.currentUser,
          ...action.payload.data.currentUser,
          isAuthenticated: true,
        },
      };
    }
    case 'USER_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
        user: null,
      };
    }
    case 'USER_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        user: action.payload.data.user,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
