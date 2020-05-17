import {
  fetchOrganizationTrashedEmployees,
  deleteOrganizationEmployee, fetchOrganization,
} from '../../actions/organizationActions';
import {EmployeesList} from '../employee/EmployeesList';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';

class OrganizationTrashedEmployees extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      organizationId: props.match.params.idOrganization,
    };
  }

  componentDidMount() {
    this.props.dispatch(
      fetchOrganizationTrashedEmployees(this.state.organizationId),
    );
    this.props.dispatch(fetchOrganization(this.state.organizationId));
  }

  handleBtnDelete(idEmployee, event) {
    event.preventDefault();
    this.props.dispatch(
      deleteOrganizationEmployee(this.state.organizationId, idEmployee),
    );
  }

  render() {
    const {user, organization} = this.props;

    if (!organization.organization) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <EmployeesList
              user={user}
              employees={organization.organization.trashedEmployees}
              handleBtnDelete={this.handleBtnDelete.bind(this)}
              title={`Сотрудники в архиве «${organization.organization.name}» `}
              status={{fetched: true, errors: null}}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

OrganizationTrashedEmployees.propTypes = {
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

export default connect(mapStateToProps)(OrganizationTrashedEmployees);
