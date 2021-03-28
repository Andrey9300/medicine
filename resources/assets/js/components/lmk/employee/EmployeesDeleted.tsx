import {
  clearEmployees,
  fetchEmployees,
} from '../../../actions/lmk/employeeActions';
import {EmployeesList} from './EmployeesList';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import {IEmployee} from '../../../interface/lmk/IEmployee';
import {IOrganization} from '../../../interface/lmk/IOrganization';
import {TState} from '../../../reducers';

interface IStateProps {
  deleted: IEmployee[];
  organization: IOrganization;
  fetched: boolean;
  errors: any;
}

interface IDispatchProps {
  clearEmployees: typeof clearEmployees;
  fetchEmployees: typeof fetchEmployees;
}

interface IProps extends IStateProps, IDispatchProps {}

class EmployeesDeleted extends React.PureComponent<IProps> {
  componentDidMount() {
    const {clearEmployees, fetchEmployees} = this.props;

    clearEmployees();
    fetchEmployees();
  }

  render() {
    const {deleted, fetched, errors} = this.props;
    const status = {
      fetched,
      errors,
    };

    if (!deleted) {
      return null;
    }

    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <EmployeesList
                employees={deleted}
                title={'Сотрудники в архиве '}
                status={status}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    organization: state.organizations.organization,
    deleted: state.employees.deleted,
    fetched: state.employees.fetched,
    errors: state.employees.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearEmployees: () => dispatch(clearEmployees()),
    fetchEmployees: (id: number) => dispatch(fetchEmployees(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesDeleted);
