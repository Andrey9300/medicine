import React from 'react';
import {connect} from 'react-redux';
import {
  fetchOrganization,
  deleteOrganization,
} from './../../actions/organizationActions';
import {fetchHospitals} from '../../actions/hospitalActions';
import {EmployeesList} from '../employee/EmployeesList';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class Organization extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      organizationId: props.match.params.id,
      employeesAttention: [],
      researchesEnds: 0,
      researchesExpired: 0,
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchOrganization(this.state.organizationId));
    this.props.dispatch(fetchHospitals());
  }

  componentDidUpdate(prevProps) {
    const {organization} = this.props;

    if (
      prevProps.organization !== organization &&
      organization.employees.length > 0
    ) {
      const employeesAttention = organization.employees.filter(
        (item) =>
          item.researches_ends.length > 0 || item.researches_expired.length > 0,
      );

      const researchesEnds = organization.employees.filter(
        (item) => item.researches_ends.length > 0,
      );

      const researchesExpired = organization.employees.filter(
        (item) =>
          item.researches_expired.length > 0 &&
          item.researches_ends.length === 0,
      );

      this.setState({
        employeesAttention,
        researchesEnds: researchesEnds.length,
        researchesExpired: researchesExpired.length,
      });
    }
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deleteOrganization(id));
  }

  render() {
    const {employeesAttention, researchesEnds, researchesExpired} = this.state;
    const {organization, hospitals} = this.props;

    if (!organization || !hospitals) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="6" sm="6" md="6">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />«
                {organization.name}»
                <Link
                  to={`/organizations/edit/${organization.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) =>
                    this.handleBtnDelete(organization.id, event)
                  }
                >
                  <i className="fa fa-trash" />
                </span>
              </CardHeader>
              <CardBlock className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Менеджер:</td>
                      <td>{organization.head_fio}</td>
                    </tr>
                    <tr>
                      <td>E-mail менеджера:</td>
                      <td>{organization.head_email}</td>
                    </tr>
                    <tr>
                      <td>Категория:</td>
                      <td>{organization.category.name}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBlock>
            </Card>
            <EmployeesList
              employees={employeesAttention}
              title={'Сотрудники требующие внимания'}
            />
          </Col>
          <Col xs="6" sm="6" md="6">
            <Card>
              <CardHeader>
                <i className="fa fa-users" aria-hidden="true" />
                Сотрудники
              </CardHeader>
              <CardBlock className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Вы контролируете медицинские осмотры:</td>
                      <td>
                        {/*<Link*/}
                        {/*  to={`/organizations/employees/${organization.id}`}*/}
                        {/*>*/}
                          {organization.employees.length} чел.
                        {/*</Link>*/}
                      </td>
                    </tr>
                    <tr>
                      <td>Просрочен медицинский осмотр:</td>
                      <td>
                        {/*<Link*/}
                        {/*  to={`/organizations/expiredEmployees/${organization.id}`}*/}
                        {/*>*/}
                          {researchesExpired} чел.
                        {/*</Link>*/}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        В следующем месяца нужно направить на медицинский
                        осмотр:
                      </td>
                      <td>
                        {/*<Link*/}
                        {/*  to={`/organizations/endsEmployees/${organization.id}`}*/}
                        {/*>*/}
                          {researchesEnds} чел.
                        {/*</Link>*/}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBlock>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-stethoscope" aria-hidden="true" />
                Медицинские центры
              </CardHeader>
              <CardBlock className="card-body">
                <Table responsive>
                  <tbody>
                    {hospitals.map((hospital) => (
                      <tr key={hospital.id}>
                        <td>
                          <Link to={`/hospital/${hospital.id}`}>
                            {hospital.name}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBlock>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-info" aria-hidden="true" />
                Информация
              </CardHeader>
              <CardBlock className="card-body">
                Справочная информация о медицинском осмотре и правилах
                оформления личной медицинской книжки
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
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    organization: state.organizations.organization,
    hospitals: state.hospitals.hospitals,
  };
};

export const OrganizationContainer = connect(mapStateToProps)(Organization);
