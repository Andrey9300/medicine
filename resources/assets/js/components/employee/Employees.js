import {deleteEmployee, forceDeleteEmployee, fetchEmployees} from '../../actions/employeeActions';
import {EmployeesList} from './EmployeesList';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';

class Employees extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchEmployees());
    }

    handleBtnForceDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(forceDeleteEmployee(id));
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteEmployee(id));
    }

    render() {
        const {user, employees, deleted} = this.props;

        if (!user || !employees.length || !deleted.length) {
            return null;
        }

        return (
            <div>
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <EmployeesList
                                employees = {employees}
                                user = {user}
                                handleBtnDelete = {this.handleBtnDelete.bind(this)}
                                title = {'Сотрудники '}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" lg="6">
                            <EmployeesList
                                employees = {deleted}
                                user = {user}
                                title = {'Уволенные сотрудники '}
                            />
                        </Col>
                    </Row>
                </div>;
            </div>
        );
    }
}

Employees.propTypes = {
    dispatch: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired,
    deleted: PropTypes.array.isRequired,
    user: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        employees: state.employees.employees,
        organization: state.organizations.organization,
        deleted: state.employees.deleted
    };
};

export default connect(mapStateToProps)(Employees);
