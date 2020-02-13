import React from 'react';
import {connect} from 'react-redux';
import {fetchOrganization, deleteOrganization} from './../../actions/organizationActions';
import {fetchHospitals} from '../../actions/hospitalActions';
import {EmployeesList} from '../employee/EmployeesList';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationId: props.params.id
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganization(this.state.organizationId));
        this.props.dispatch(fetchHospitals());
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteOrganization(id));
    }

    render() {
        const {user, organization, hospitals} = this.props;
        let linkEdit = null;
        let buttonDelete = null;

        if (organization === null) {
            return null;
        }

        if (user && user.role === 'admin') {
            linkEdit =
                <Link to={`organizations/edit/${organization.id}`} style={{marginLeft: '18px'}}>
                    <i className="fa fa-pencil"/>
                </Link>;
            buttonDelete =
                <span className="pull-right" onClick={(event) => this.handleBtnDelete(organization.id, event)}>
                    <i className="fa fa-trash"/>
                </span>;
        }

        const researchesEnds = organization.employees.reduce((previousValue, employee) => {
            if (employee.researches_ends.length) {
                return parseInt(previousValue, 10) + 1;
            }

            return parseInt(previousValue, 10);
        }, 0);

        const researchesExpired = organization.employees.reduce((previousValue, employee) => {
            if (employee.researches_expired.length) {
                return parseInt(previousValue, 10) + 1;
            }

            return parseInt(previousValue, 10);
        }, 0);

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="6" sm="6" md="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-building-o" aria-hidden="true"/>
                                «{organization.name}»
                                {linkEdit}
                                {buttonDelete}
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <tbody>
                                    <tr>
                                        <td>Руководитель:</td>
                                        <td>{organization.head_fio}</td>
                                    </tr>
                                    <tr>
                                        <td>E-mail руководителя: </td>
                                        <td>{organization.head_email}</td>
                                    </tr>
                                    <tr>
                                        <td>Категория:</td>
                                        <td>
                                            {organization.category.name}
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </CardBlock>
                        </Card>
                        <EmployeesList
                            employees = {organization.employees}
                            title = {`Сотрудники «${organization.name}» `}
                        />
                    </Col>
                    <Col xs="6" sm="6" md="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-users" aria-hidden="true"/>
                                Сотрудники
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <tbody>
                                    <tr>
                                        <td>Вы контролируете медицинские осмотры:</td>
                                        <td>
                                            <Link to={`organizations/employees/${organization.id}`}>
                                                {organization.employees.length} чел.
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Просрочен медицинский осмотр:</td>
                                        <td>
                                            <Link to={`organizations/expiredEmployees/${organization.id}`}>
                                                {researchesExpired} чел.
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>В следующем месяца нужно направить на
                                            медицинский осмотр:</td>
                                        <td>
                                            <Link to={`organizations/endsEmployees/${organization.id}`}>
                                                {researchesEnds} чел.
                                            </Link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </CardBlock>
                        </Card>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-money" aria-hidden="true"/>
                                Бюджет
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <tbody>
                                    <tr>
                                        <td>
                                            Плановый бюджет МО в {new Date().getFullYear()} году
                                            составляет (с учетом указанных цен в мед учреждении)
                                        </td>
                                        <td>
                                            <Link>
                                                {organization.totalSumForResearches}&nbsp;
                                                <i className="fa fa-rub" aria-hidden="true"/>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>В прошлом месяце израсходовано</td>
                                        <td>
                                            <Link>
                                                {organization.totalSumForCompletedResearches}&nbsp;
                                                <i className="fa fa-rub" aria-hidden="true"/>
                                            </Link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </CardBlock>
                        </Card>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-stethoscope" aria-hidden="true"/>
                                Медицинские центры
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <tbody>
                                    {hospitals.map((hospital) => {
                                        return (
                                            <tr key={hospital.id}>
                                                <td>
                                                    <Link to={`hospitals/${hospital.id}`}>
                                                        {hospital.name}
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </CardBlock>
                        </Card>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-info" aria-hidden="true"/>
                                Информация
                            </CardHeader>
                            <CardBlock className="card-body">
                                Справочная информация о медицинском осмотре и правилах оформления личной медицинской
                                книжки
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

Organization.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        organization: state.organizations.organization,
        hospitals: state.hospitals.hospitals
    };
};

export default connect(mapStateToProps)(Organization);
