import {deleteOrganization, fetchOrganizations} from '../../actions/organizationActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';

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
            <div>
                <h1 className="pull-left">Организации</h1>
                <div className="col-lg-12">
                    <Link to="organizations/create" className="btn btn-primary btn-sm pull-left">
                        Добавить &nbsp; <i className="glyphicon glyphicon-plus"></i>
                    </Link>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Адрес</th>
                                <th>Юридическое лицо</th>
                                <th>ФИО руководителя</th>
                                <th>E-mail руководителя</th>
                                <th>E-mail менеджера</th>
                                <th>E-mail шеф-повара</th>
                                <th>Телефон</th>
                                <th>Сертифицирован</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.organizations.map((organization, index) => {
                                return (
                                    <tr key={organization.id}>
                                        <td>{organization.name}</td>
                                        <td>{organization.address}</td>
                                        <td>{organization.legal_entity}</td>
                                        <td>{organization.head_fio}</td>
                                        <td>{organization.head_email}</td>
                                        <td>{organization.regional_email}</td>
                                        <td>{organization.chef_email}</td>
                                        <td>{organization.phone}</td>
                                        <td>{organization.is_certification}</td>
                                        <td>
                                            <Link to={`organizations/${organization.id}`}
                                                  className="btn btn-warning btn-xs pull-left">
                                                <i className="glyphicon glyphicon-pencil"></i>
                                            </Link>
                                            <Link to={`organizations/edit/${organization.id}`}
                                                  className="btn btn-success btn-xs pull-left">
                                                <i className="glyphicon glyphicon-pencil"></i>
                                            </Link>
                                            <form id={`form_${organization.id}`} className="pull-left" method="post">
                                                <input type="hidden" name="organization_id" value={organization.id} />
                                                <a className="btn btn-danger btn-xs"
                                                   onClick={(event) => this.handleBtnDelete(organization.id, event)}
                                                   href="#" id={organization.id}>
                                                    <i className="glyphicon glyphicon-trash"></i>
                                                </a>
                                            </form>
                                        </td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
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
