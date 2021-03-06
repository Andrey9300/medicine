import {fetchOrganizations} from '../../../actions/lmk/organizationActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {IOrganization} from '../../../interface/lmk/IOrganization';
import {TState} from '../../../reducers';

interface IStateProps {
  organizations: IOrganization[];
}

interface IDispatchProps {
  fetchOrganizations: typeof fetchOrganizations;
}

interface IProps extends IStateProps, IDispatchProps {}

class Organizations extends React.PureComponent<IProps> {
  componentDidMount() {
    const {fetchOrganizations} = this.props;

    fetchOrganizations();
  }

  render() {
    const {organizations} = this.props;

    if (!organizations) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="6" md="4">
              <Card className="text-center">
                <CardHeader>Организаций нет</CardHeader>
                <CardBody>
                  <Link to={'/services/lmk/organizations/create'}>
                    Добавить организацию
                  </Link>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Объекты ({organizations.length})
                <Link
                  to={'/services/lmk/organizations/create'}
                  className="btn btn-primary btn-sm pull-right"
                >
                  Добавить <i className="icon-plus" />
                </Link>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                      <th>Менеджер</th>
                      <th>E-mail</th>
                      <th>Сотрудники</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.map((organization) => {
                      return (
                        <tr key={organization.id}>
                          <td>
                            <Link
                              to={`/services/lmk/organization/${organization.id}`}
                            >
                              {organization.name}
                            </Link>
                          </td>
                          <td>{organization.head_fio}</td>
                          <td>{organization.head_email}</td>
                          <td>
                            <Link
                              to={`/services/lmk/organizations/employees/${organization.id}`}
                              className="btn btn-info btn-xs pull-left"
                            >
                              Сотрудники
                              <i className="glyphicon glyphicon-pencil" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    organizations: state.organizations.organizations,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations()),
  };
};

export const OrganizationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Organizations);
