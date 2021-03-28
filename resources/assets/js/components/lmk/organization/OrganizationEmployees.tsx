import {
  fetchOrganization,
  clearOrganizationEmployees,
  fetchOrganizationEmployeesWithCheck,
} from '../../../actions/lmk/organizationActions';
import {EmployeesList} from '../employee/EmployeesList';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {TState} from '../../../reducers';
import {IOrganization} from '../../../interface/lmk/IOrganization';
import {IEmployee} from '../../../interface/lmk/IEmployee';

interface IStateProps {
  fetched: boolean;
  fetchedEmployees: boolean;
  organization: IOrganization;
  errors: any;
}

interface IDispatchProps {
  clearOrganizationEmployees: typeof clearOrganizationEmployees;
  fetchOrganization: typeof fetchOrganization;
  fetchOrganizationEmployeesWithCheck: typeof fetchOrganizationEmployeesWithCheck;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
  type: any;
  title: string;
}

interface IState {
  organizationId: number;
  employeesShow: IEmployee[];
  title: string;
}

class OrganizationEmployee extends React.PureComponent<IProps, IState> {
  state: IState = {
    organizationId: null,
    employeesShow: null,
    title: '',
  };

  getMessage(message: string) {
    const {title} = this.state;

    return (
      <Card>
        <CardHeader>
          <i className="fa fa-users" aria-hidden="true" />
          {title}
        </CardHeader>
        <CardBody className="card-body">{message}</CardBody>
      </Card>
    );
  }

  componentDidMount() {
    const {
      match,
      clearOrganizationEmployees,
      fetchOrganization,
      fetchOrganizationEmployeesWithCheck,
    } = this.props;
    const organizationId = match.params.idOrganization;

    this.setState({organizationId});

    clearOrganizationEmployees();
    fetchOrganization(organizationId);
    fetchOrganizationEmployeesWithCheck(organizationId);
  }

  componentDidUpdate(prevProps: IProps) {
    const {
      organization: {employees},
      fetchedEmployees,
    } = this.props;

    if (
      (prevProps.organization &&
        prevProps.organization.employees &&
        employees &&
        prevProps.organization.employees.length !== employees.length) ||
      prevProps.fetchedEmployees !== fetchedEmployees
    ) {
      this.setState({employeesShow: [], title: ''}, this.setEmployeesShow);
    }
  }

  setEmployeesShow() {
    const {
      organization: {employees, name},
      type,
    } = this.props;
    let employeesShow = employees;
    let title = `Сотрудники «${name}» `;

    switch (type) {
      case 'all':
        employeesShow = employees;
        title = `Сотрудники «${name}» `;
        break;
      case 'expired':
        employeesShow = employees.filter(
          (item) =>
            item.researches_expired &&
            item.researches_expired.length > 0 &&
            item.researches_ends &&
            item.researches_ends.length === 0,
        );

        title = `Сотрудники с заканчивающимся МО «${name}» `;
        break;
      case 'ends':
        employeesShow = employees.filter(
          (item) => item.researches_ends && item.researches_ends.length > 0,
        );
        title = `Сотрудники с просроченным МО «${name}» `;
        break;
    }

    this.setState({employeesShow, title});
  }

  render() {
    const {employeesShow, title} = this.state;
    const {fetched, fetchedEmployees, errors} = this.props;

    if (!fetched) {
      return this.getMessage('Загрузка');
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <EmployeesList
              employees={employeesShow}
              title={title}
              status={{
                fetched: fetchedEmployees,
                errors,
                fetchedWithCheck: true,
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    fetched: state.organizations.fetched,
    fetchedEmployees: state.organizations.fetchedEmployees,
    organization: state.organizations.organization,
    errors: state.organizations.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearOrganizationEmployees: () => dispatch(clearOrganizationEmployees()),
    fetchOrganization: (organizationId: number) =>
      dispatch(fetchOrganization(organizationId)),
    fetchOrganizationEmployeesWithCheck: (organizationId: number) =>
      dispatch(fetchOrganizationEmployeesWithCheck(organizationId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationEmployee);
