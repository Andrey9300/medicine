const initialState = {
  errors: null,
  fetched: false,
  organization: null,
  organizations: [],
  expired: [],
  organizationEmployees: [],
};

export default function reducer(state = initialState, action) {
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
      employees.sort(
        (a, b) => b.researches_ends.length - a.researches_ends.length,
      );

      return {
        ...state,
        errors: null,
        fetched: true,
        organization: action.payload.data.organization,
      };
    }
    case 'ORGANIZATION_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: true,
        organization: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
