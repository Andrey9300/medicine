import {fetchOrganization, deleteOrganizationEmployee} from '../../actions/organizationActions';
import {EmployeesList} from '../employee/EmployeesList';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';

class OrganizationEmployee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            organizationId: props.params.idOrganization
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganization(this.state.organizationId));
    }

    handleBtnDelete(idEmployee, event) {
        event.preventDefault();
        this.props.dispatch(deleteOrganizationEmployee(this.state.organizationId, idEmployee));
    }

    render() {
        const {organization} = this.props;

        if (organization.organization === null) {
            return null;
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <EmployeesList
                            employees = {organization.organization.employees}
                            handleBtnDelete = {this.handleBtnDelete.bind(this)}
                            title = {`Сотрудники «${organization.organization.name}» `}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

OrganizationEmployee.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        organization: state.organizations
    };
};

export default connect(mapStateToProps)(OrganizationEmployee);
