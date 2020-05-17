import {
  fetchOrganization,
  deleteOrganizationEmployee,
  clearOrganizationEmployees,
} from '../../actions/organizationActions';
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
    const {dispatch} = this.props;

    dispatch(clearOrganizationEmployees());
    dispatch(fetchOrganization(this.state.organizationId));
  }

  handleBtnDelete(idEmployee, event) {
    event.preventDefault();
    this.props.dispatch(
      deleteOrganizationEmployee(this.state.organizationId, idEmployee),
    );
  }

  render() {
    const {user, organization} = this.props;

    if (!organization.fetched) {
      return this.getMessage('Загрузка');
    }

    if (!organization.organization) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <EmployeesList
              user={user}
              employees={organization.organization.employees}
              handleBtnDelete={this.handleBtnDelete.bind(this)}
              title={`Сотрудники «${organization.organization.name}» `}
              status={{fetched: true, errors: null}}
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
    user: state.users.user,
    organization: state.organizations,
  };
};

export default connect(mapStateToProps)(OrganizationEmployee);
