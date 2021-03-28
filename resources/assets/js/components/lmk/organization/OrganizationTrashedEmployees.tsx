import {
  fetchOrganizationTrashedEmployees,
  fetchOrganization,
} from '../../../actions/lmk/organizationActions';
import {EmployeesList} from '../employee/EmployeesList';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import {IOrganization} from '../../../interface/lmk/IOrganization';
import {TState} from '../../../reducers';

interface IStateProps {
  organization: IOrganization;
}

interface IDispatchProps {
  fetchOrganizationTrashedEmployees: typeof fetchOrganizationTrashedEmployees;
  fetchOrganization: typeof fetchOrganization;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

class OrganizationTrashedEmployees extends React.PureComponent<IProps> {
  componentDidMount() {
    const {match} = this.props;
    const organizationId = match.params.idOrganization;

    fetchOrganizationTrashedEmployees(organizationId);
    fetchOrganization(organizationId);
  }

  render() {
    const {organization} = this.props;

    if (!organization) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <EmployeesList
              employees={organization.trashedEmployees}
              title={`Сотрудники в архиве «${organization.name}» `}
              status={{fetched: true, errors: null}}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    organization: state.organizations.organization,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchOrganizationTrashedEmployees: (organizationId: number) =>
      dispatch(fetchOrganizationTrashedEmployees(organizationId)),
    fetchOrganization: (organizationId: number) =>
      dispatch(fetchOrganization(organizationId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationTrashedEmployees);
