import React from 'react';
import {connect} from 'react-redux';
import {fetchCommonInfo} from './../../actions/legalEntityActions';
import {EmployeesList} from '../employee/EmployeesList';
import PropTypes from 'prop-types';
import {deleteEmployee} from '../../actions/employeeActions';
import {Row, Col} from 'reactstrap';

class LegalEntityExpiredEmployees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            legalEntityId: props.params.legalEntityId
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchCommonInfo(this.state.legalEntityId));
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteEmployee(id));
    }

    render() {
        const {legalEntity, employeesResearchesExpired} = this.props;

        if (legalEntity === null) {
            return null;
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <EmployeesList
                            employees = {employeesResearchesExpired}
                            handleBtnDelete = {this.handleBtnDelete.bind(this)}
                            title = {`Сотрудники «${legalEntity.name}» с просроченным медицинским осмотром `}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

LegalEntityExpiredEmployees.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        legalEntity: state.legalEntities.legalEntityCommonInfo.legalEntity,
        employeesResearchesExpired: state.legalEntities.legalEntityCommonInfo.employeesResearchesExpired
    };
};

export default connect(mapStateToProps)(LegalEntityExpiredEmployees);
