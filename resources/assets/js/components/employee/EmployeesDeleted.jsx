import {fetchEmployees} from '../../actions/employeeActions';
import {EmployeesList} from './EmployeesList';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';

class EmployeesDeleted extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchEmployees());
    }

    render() {
        const {user, deleted} = this.props;

        if (!user || !deleted) {
            return null;
        }

        return (
            <div>
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <EmployeesList
                                employees = {deleted}
                                user = {user}
                                title = {'Уволенные сотрудники '}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

EmployeesDeleted.propTypes = {
    dispatch: PropTypes.func.isRequired,
    deleted: PropTypes.array.isRequired,
    user: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        organization: state.organizations.organization,
        deleted: state.employees.deleted
    };
};

export default connect(mapStateToProps)(EmployeesDeleted);
