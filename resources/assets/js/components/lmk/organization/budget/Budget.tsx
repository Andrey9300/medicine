import React from 'react';
import {connect} from 'react-redux';
import {
  fetchOrganization,
  deleteOrganization,
} from '../../../../actions/lmk/organizationActions';
import {Link} from 'react-router-dom';
import {fetchHospitals} from '../../../../actions/lmk/hospitalActions';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {TState} from '../../../../reducers';
import {IOrganization} from '../../../../interface/lmk/IOrganization';

interface IStateProps {
  organization: IOrganization;
}

interface IDispatchProps {
  fetchOrganization: typeof fetchOrganization;
  fetchHospitals: typeof fetchHospitals;
  deleteOrganization: typeof deleteOrganization;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

class Budget extends React.PureComponent<IProps> {
  componentDidMount() {
    const {match, fetchOrganization, fetchHospitals} = this.props;
    fetchOrganization(match.params.id);
    fetchHospitals();
  }

  handleBtnDelete(id: number, event: any) {
    const {deleteOrganization} = this.props;
    event.preventDefault();
    deleteOrganization(id);
  }

  render() {
    const {organization} = this.props;
    let errorsMessage = '';

    if (!organization) {
      return null;
    }

    return (
      <div>
        {errorsMessage}
        <div className="animated fadeIn">
          <Row>
            <Col xs="6" sm="6" md="6">
              <Card>
                <CardHeader>
                  <i className="fa fa-building-o" aria-hidden="true" />«
                  {organization.name}»
                </CardHeader>
                <CardBody className="card-body">
                  <Table responsive>
                    <tbody>
                      <tr>
                        <td>Менеджер:</td>
                        <td>{organization.head_fio}</td>
                      </tr>
                      <tr>
                        <td>E-mail менеджера: </td>
                        <td>{organization.head_email}</td>
                      </tr>
                      <tr>
                        <td>Категория:</td>
                        <td>{organization.category.name}</td>
                      </tr>
                      <tr>
                        <td>
                          <Link
                            to={`/services/lmk/organizations/edit/${organization.id}`}
                            className="btn btn-success btn-xs pull-left"
                          >
                            Редактировать
                          </Link>
                        </td>
                        <td>
                          <form
                            id={`form_${organization.id}`}
                            className="pull-left"
                            method="post"
                          >
                            <input
                              type="hidden"
                              name="organization_id"
                              value={organization.id}
                            />
                            <a
                              className="btn btn-danger btn-xs"
                              onClick={(event) =>
                                this.handleBtnDelete(organization.id, event)
                              }
                              href="#"
                              id={`${organization.id}`}
                            >
                              Удалить
                            </a>
                          </form>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
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
    fetchOrganization: (id: number) => dispatch(fetchOrganization(id)),
    fetchHospitals: () => dispatch(fetchHospitals()),
    deleteOrganization: (id: number) => dispatch(deleteOrganization(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
