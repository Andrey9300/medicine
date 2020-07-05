import {
  fetchOrganization,
  clearOrganizationEmployees,
  fetchOrganizationEmployeesWithCheck,
} from '../../actions/lmk/organizationActions';
import {EmployeesList} from '../employee/EmployeesList';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';

class OrganizationEmployee extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      organizationId: props.match.params.idOrganization,
      employeesShow: [],
      title: '',
    };
  }

  getMessage(message) {
    const {title} = this.props;

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
    const {organizationId} = this.state;
    const {dispatch} = this.props;

    dispatch(clearOrganizationEmployees());
    dispatch(fetchOrganization(organizationId));
    dispatch(fetchOrganizationEmployeesWithCheck(organizationId));
  }

  componentDidUpdate(prevProps) {
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
    const {
      fetched,
      fetchedEmployees,
      organization: {errors},
    } = this.props;

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

OrganizationEmployee.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
  router: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    fetched: state.organizations.fetched,
    fetchedEmployees: state.organizations.fetchedEmployees,
    organization: state.organizations.organization,
  };
};

export default connect(mapStateToProps)(OrganizationEmployee);
