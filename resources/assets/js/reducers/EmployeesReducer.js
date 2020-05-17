const initialState = {
  errors: null,
  fetched: false,
  employee: null,
  employeeResearch: null,
  employeeResearches: [],
  employees: [],
  deleted: [],
  withoutOrganization: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'EMPLOYEES_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'EMPLOYEES_FULFILLED': {
      const {employees, deleted, withoutOrganization} = action.payload.data;

      employees.sort(
        (a, b) => b.researches_ends.length - a.researches_ends.length,
      );
      deleted.sort(
        (a, b) => b.researches_ends.length - a.researches_ends.length,
      );
      withoutOrganization.sort(
        (a, b) => b.researches_ends.length - a.researches_ends.length,
      );

      return {
        ...state,
        errors: null,
        fetched: true,
        employees,
        deleted,
        withoutOrganization,
      };
    }
    case 'EMPLOYEE_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'EMPLOYEE_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        employee: action.payload.data.employee,
      };
    }
    case 'EMPLOYEE_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: false,
        employee: null,
      };
    }
    case 'EMPLOYEE_RESEARCHES_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'EMPLOYEE_RESEARCHES_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        employeeResearches: action.payload.data.employeeResearches,
      };
    }
    case 'EMPLOYEE_RESEARCHES_CLEAR': {
      return {
        ...state,
        errors: null,
        fetched: false,
        employeeResearches: [],
      };
    }
    case 'EMPLOYEE_RESEARCH_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'EMPLOYEE_RESEARCH_FULFILLED': {
      return {
        ...state,
        errors: null,
        fetched: true,
        employeeResearch: action.payload,
      };
    }
    case 'EMPLOYEE_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    case 'EMPLOYEE_RESEARCHES_ADD_REJECTED': {
      return {
        ...state,
        errors: action.payload,
        fetched: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
