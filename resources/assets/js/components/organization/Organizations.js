import {deleteOrganization, fetchOrganizations} from '../../actions/organizationActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock,
    Table
} from 'reactstrap';

class Organizations extends React.Component {

    constructor() {
        super();
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganizations());
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteOrganization(id));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>Организации
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Название</th>
                                            <th>Юридическое лицо</th>
                                            <th>ФИО руководителя</th>
                                            <th>E-mail руководителя</th>
                                            <th>Сотрудники</th>
                                            <th>Редактировать</th>
                                            <th>Удалить</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.organizations.map((organization, index) => {
                                        return (
                                            <tr key={organization.id}>
                                                <td>
                                                    <Link to={`organizations/${organization.id}`}>
                                                        {organization.name}
                                                    </Link>
                                                </td>
                                                <td>{organization.legal_entity}</td>
                                                <td>{organization.head_fio}</td>
                                                <td>{organization.head_email}</td>
                                                <td>
                                                    <Link to={`organizations/users/${organization.id}`}
                                                          className="btn btn-info btn-xs pull-left">Сотрудники
                                                        <i className="glyphicon glyphicon-pencil"></i>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={`organizations/edit/${organization.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"></i>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${organization.id}`} className="pull-left" method="post">
                                                        <input type="hidden" name="organization_id" value={organization.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(organization.id, event)}
                                                           href="#" id={organization.id}>Удалить
                                                            <i className="glyphicon glyphicon-trash"></i>
                                                        </a>
                                                    </form>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </Table>
                                <Link to="organizations/create" className="btn btn-primary btn-sm pull-left">
                                    Добавить &nbsp; <i className="glyphicon glyphicon-plus"></i>
                                </Link>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{organizations: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        organizations: state.organizations.organizations
    };
}
export default connect(mapStateToProps)(Organizations);
