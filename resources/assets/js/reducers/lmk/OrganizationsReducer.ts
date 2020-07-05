import {AnyAction} from 'redux';
import {IOrganization} from '../../interface/lmk/IOrganization';

interface IState {
  errors: object;
  fetched: boolean;
  fetchedEmployees: boolean;
  organization: IOrganization;
  organizations: IOrganization[];
  expired: IOrganization[];
}

const initialState: IState = {
  errors: null,
  fetched: false,
  fetchedEmployees: false,
  organization: {
    category: null,
    category_id: null,
    employees: null,
    trashedEmployees: null,
    head_email: null,
    head_fio: null,
    head_phone: null,
    head_position: null,
    id: null,
    name: null,
    totalSumForCompletedResearches: null,
    totalSumForResearches: null,
    users: null,
  },
  organizations: [],
  expired: [],
};

export default function reducer(
  state = initialState,
  action: AnyAction,
): IState {
  switch (action.type) {
    case 'ORGANIZATION_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'ORGANIZATION_EDIT_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'ORGANIZATIONS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'ORGANIZATIONS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        organizations: action.payload.data.organizations,
      };
    }
    case 'EXPIRED_ORGANIZATIONS_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'EXPIRED_ORGANIZATIONS_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        expired: action.payload.data.expired,
      };
    }
    case 'ORGANIZATION_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'ORGANIZATION_FULFILLED': {
      const {
        organization: {employees},
      } = action.payload.data;
      employees.sort((a: any, b: any) => {
        if (!b.researches_ends || !a.researches_ends) {
          return 1;
        }

        return b.researches_ends.length - a.researches_ends.length;
      });

      return {
        ...state,
        errors: null,
        fetched: true,
        organization: {
          ...state.organization,
          ...action.payload.data.organization,
          employees,
        },
      };
    }
    case 'ORGANIZATION_EMPLOYEES_WITH_CHECK_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
        fetchedEmployees: false,
      };
    }
    case 'ORGANIZATION_EMPLOYEES_WITH_CHECK_FULFILLED': {
      const {employeesWithCheck} = action.payload.data;

      employeesWithCheck.sort((a: any, b: any) => {
        if (!b.researches_ends || !a.researches_ends) {
          return 1;
        }

        return b.researches_ends.length - a.researches_ends.length;
      });

      return {
        ...state,
        errors: null,
        fetched: true,
        fetchedEmployees: true,
        organization: {
          ...state.organization,
          employees: employeesWithCheck,
        },
      };
    }
    case 'ORGANIZATION_TRASHED_EMPLOYEES_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'ORGANIZATION_TRASHED_EMPLOYEES_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        organization: {
          ...state.organization,
          trashedEmployees: action.payload.data.trashedEmployees,
        },
      };
    }
    case 'ORGANIZATION_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: false,
        fetchedEmployees: false,
        organization: null,
      };
    }
    case 'ORGANIZATION_EMPLOYEES_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: false,
        fetchedEmployees: false,
        organization: {
          ...state.organization,
          employees: [],
        },
      };
    }
    default:
      return {
        ...state,
      };
  }
}
