import React from 'react';
import {connect} from 'react-redux';
import {
  fetchOrganization,
  deleteOrganization,
  clearOrganization,
  fetchOrganizationEmployeesWithCheck,
} from '../../actions/organizationActions';
import {fetchHospitals} from '../../actions/hospitalActions';
import {EmployeesList} from '../employee/EmployeesList';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';

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

  componentDidMount() {
    const {organizationId} = this.state;
    const {dispatch} = this.props;

    dispatch(clearOrganization());
    dispatch(fetchOrganization(organizationId));
    dispatch(fetchOrganizationEmployeesWithCheck(organizationId));
    dispatch(fetchHospitals());

    this.setResearches();
  }

  componentDidUpdate(prevProps, prevState) {
    const {organization, fetchedEmployees} = this.props;

    if (
      prevProps.organization !== organization &&
      organization &&
      organization.employees &&
      organization.employees.length > 0
    ) {
      this.setResearches();
    }

    if (prevProps.fetchedEmployees !== fetchedEmployees) {
      this.setResearches();
    }
  }

  setResearches() {
    const {organization} = this.props;

    if (!organization || !organization.employees) {
      return;
    }

    const employeesAttention = organization.employees.filter(
      (item) =>
        (item.researches_ends && item.researches_ends.length > 0) ||
        (item.researches_expired && item.researches_expired.length > 0),
    );
    const researchesEnds = organization.employees.filter(
      (item) => item.researches_ends && item.researches_ends.length > 0,
    );
    const researchesExpired = organization.employees.filter(
      (item) =>
        item.researches_expired &&
        item.researches_expired.length > 0 &&
        item.researches_ends &&
        item.researches_ends.length === 0,
    );

    this.setState({
      employeesAttention,
      researchesEnds: researchesEnds.length,
      researchesExpired: researchesExpired.length,
    });
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deleteOrganization(id));
  }

  getMessage(message) {
    return (
      <Card>
        <CardHeader>
          <i className="fa fa-building-o" aria-hidden="true" />
        </CardHeader>
        <CardBody className="card-body">{message}</CardBody>
      </Card>
    );
  }

  render() {
    const {employeesAttention, researchesEnds, researchesExpired} = this.state;
    const {
      organization,
      hospitals,
      fetched,
      errors,
      fetchedEmployees,
    } = this.props;

    if (errors) {
      return this.getMessage('Ошибка, попробуйте снова');
    }

    if (!fetched || !organization) {
      return this.getMessage('Загрузка');
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />«
                {organization.name}»
                <Link
                  to={`/services/lmk/organizations/edit/${organization.id}`}
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
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>ФИО:</td>
                      <td>{organization.head_fio}</td>
                    </tr>
                    <tr>
                      <td>Должность:</td>
                      <td>{organization.head_position}</td>
                    </tr>
                    <tr>
                      <td>Телефон менеджера:</td>
                      <td>{organization.head_phone}</td>
                    </tr>
                    <tr>
                      <td>
                        <div>E-mail менеджера:</div>
                        <div
                          style={{
                            fontSize: '12px',
                            fontStyle: 'italic',
                            lineHeight: '24px',
                            fontWeight: '300',
                          }}
                        >
                          на данный адрес будут приходить уведомления
                        </div>
                      </td>
                      <td>{organization.head_email}</td>
                    </tr>
                    <tr>
                      <td>Категория:</td>
                      <td style={{maxWidth: '300px'}}>
                        {organization.category && organization.category.name}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <EmployeesList
              employees={employeesAttention}
              title={'Сотрудники требующие внимания '}
              status={{
                fetched: fetchedEmployees,
                errors: null,
                fetchedWithCheck: true,
              }}
            />
          </Col>
          <Col xs="12" sm="12" md="4" lg="4" xl="4">
            <Card>
              <CardHeader>
                <i className="fa fa-users" aria-hidden="true" />
                Сотрудники
                <Link
                  to="/services/lmk/employees/create"
                  className="btn btn-primary btn-sm pull-right"
                >
                  Добавить сотрудника
                  <i className="icon-plus" />
                </Link>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Вы контролируете медицинские осмотры:</td>
                      <td>
                        <Link
                          to={`/services/lmk/organizations/employees/${organization.id}`}
                        >
                          {organization.employees.length} чел.
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        В следующем месяце нужно направить на медицинский
                        осмотр:
                      </td>
                      <td>
                        <Link
                          to={`/services/lmk/organizations/employeesExpired/${organization.id}`}
                        >
                          {researchesExpired} чел.
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Просрочен медицинский осмотр:</td>
                      <td>
                        <Link
                          to={`/services/lmk/organizations/employeesEnds/${organization.id}`}
                        >
                          {researchesEnds} чел.
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link
                          to={`/services/lmk/organizations/trashedEmployees/${organization.id}`}
                        >
                          Сотрудники в архиве
                        </Link>
                      </td>
                      <td />
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-stethoscope" aria-hidden="true" />
                Медицинские центры
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    {hospitals.map((hospital) => (
                      <tr key={hospital.id}>
                        <td>
                          <Link to={`/services/lmk/hospital/${hospital.id}`}>
                            {hospital.name}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-info" aria-hidden="true" />
                Информация
              </CardHeader>
              <CardBody className="card-body">
                <p>
                  С подробной информацией о медицинских осмотрах Вы можете
                  ознакомиться по ссылкам:
                </p>
                <ul>
                  <li>
                    <a
                      href="/blog/medicinskie-osmotry/lichnaja-medicinskaja-knizhka-lmk/"
                      target="_blank"
                    >
                      Оформление личной медицинской книжки (ЛМК)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog/medicinskie-osmotry/gigienicheskoe-obuchenie-i-attestacija-goia/"
                      target="_blank"
                    >
                      Гигиеническое обучение и аттестация (ГОиА).
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog/medicinskie-osmotry/vakcinacija-objazatelnye-profilakticheskie-privivki-dlja-lmk/"
                      target="_blank"
                    >
                      Вакцинация (для ЛМК).
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog/medicinskie-osmotry/medicinskij-otvod-i-dobrovolnyj-otkaz-ot-vakcinacii-privivok/"
                      target="_blank"
                    >
                      Медицинский отвод от вакцинации.
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog/medicinskie-osmotry/predvaritelnyj-i-periodicheskij-medicinskie-osmotry/"
                      target="_blank"
                    >
                      Предварительный и периодический медицинский осмотр.
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog/medicinskie-osmotry/psihiatricheskoe-osvidetelstvovanie/"
                      target="_blank"
                    >
                      Психиатрическое освидетельствование.
                    </a>
                  </li>
                </ul>
              </CardBody>
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
  fetched: PropTypes.bool,
  fetchedEmployees: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    organization: state.organizations.organization,
    fetched: state.organizations.fetched,
    fetchedEmployees: state.organizations.fetchedEmployees,
    errors: state.organizations.errors,
    hospitals: state.hospitals.hospitals,
  };
};

export const OrganizationContainer = connect(mapStateToProps)(Organization);
