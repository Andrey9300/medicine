import {fetchOrganizations} from '../../actions/organizationActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class Organizations extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchOrganizations());
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
                <CardBlock>
                  <Link to={'/organizations/create'}>Добавить организацию</Link>
                </CardBlock>
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
                <i className="fa fa-building-o" aria-hidden="true"/>Объекты
                                ({organizations.length})
                <Link to={'/organizations/create'} className="btn btn-primary btn-sm pull-right">
                  Добавить <i className="icon-plus"/>
                </Link>
              </CardHeader>
              <CardBlock className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                      <th>Руководитель</th>
                      <th>E-mail</th>
                      <th>Сотрудники</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.map((organization) => {
                      return (
                        <tr key={organization.id}>
                          <td>
                            <Link to={`/organizations/${organization.id}`}>
                              {organization.name}
                            </Link>
                          </td>
                          <td>{organization.head_fio}</td>
                          <td>{organization.head_email}</td>
                          <td>
                            <Link to={`/organizations/employees/${organization.id}`}
                              className="btn btn-info btn-xs pull-left">Сотрудники
                              <i className="glyphicon glyphicon-pencil"/>
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
          </Col>
        </Row>
      </div>
    );
  }
}

Organizations.propTypes = {
  dispatch: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    organizations: state.organizations.organizations
  };
};

export default connect(mapStateToProps)(Organizations);
