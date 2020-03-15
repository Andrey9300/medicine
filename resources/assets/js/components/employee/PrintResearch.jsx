import React from 'react';
import {connect} from 'react-redux';
import {
  fetchEmployee,
  fetchEmployeeResearches,
  editEmployeeJson,
} from './../../actions/employeeActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Button,
} from 'reactstrap';
import {fetchHospitals} from '../../actions/hospitalActions';
import {fetchOrganization} from '../../actions/organizationActions';
import {createMarkup} from '../../utils/errorsHelper';

class PrintEmployee extends React.PureComponent {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(props.location.search);

    this.state = {
      errors: null,
      employeeId: props.match.params.id,
      needVga: searchParams.get('needVga') ? true : false,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchEmployeeResearches(this.state.employeeId));
    this.props.dispatch(fetchEmployee(this.state.employeeId));
    this.props.dispatch(fetchHospitals());
  }

  componentDidUpdate(prevProps) {
    const {employee} = this.props;

    if (prevProps.employee !== employee) {
      this.props.dispatch(fetchOrganization(employee.organization.id));
    }
  }

  addNeedVga() {
    const {needVga} = this.state;
    const {employeeResearches} = this.props;
    let vga2Research = null;

    if (!needVga) {
      return null;
    }

    employeeResearches.forEach((employeeResearch) => {
      if (employeeResearch.research.id === 20) {
        vga2Research = employeeResearch.research;
      }
    });

    return vga2Research;
  }

  researches() {
    const {employee} = this.props;
    const bufferTr = [];
    let bufferTd = [];
    const researches = employee.researches_expired.concat(
      employee.researches_ends,
    );

    if (this.addNeedVga()) {
      researches.push(this.addNeedVga());
    }

    // в отдельный раздел псих. осв., предварительный / периодический МО
    const filterResearches = researches.filter((research) => {
      return (
        research.id !== 19 &&
        research.id !== 18 &&
        research.id !== 13 &&
        research.id !== 14 &&
        research.id !== 20
      );
    });

    filterResearches.forEach((research, index) => {
      if (index % 2 === 0) {
        bufferTr.push(
          <tr key={research.id}>
            {bufferTd}
            <td>{research.name}</td>
          </tr>,
        );
        bufferTd = [];
      } else {
        bufferTd.push(<td key={research.id}>{research.name}</td>);
      }
    });

    if (
      (bufferTr.length % 2 === 1 && bufferTd.length) ||
      (bufferTr.length === 0 && bufferTd.length)
    ) {
      bufferTr.push(<tr key={999}>{bufferTd}</tr>);
    }

    bufferTr.push(this.getVaccines(researches));

    return bufferTr;
  }

  getVaccines(researches) {
    const {employee} = this.props;

    if (employee.category.id !== 2) {
      return null;
    }

    // в отдельный раздел Гепатит и Зонне
    let vaccines = researches.filter((research) => {
      return research.id === 13 || research.id === 14 || research.id === 20;
    });
    const vaccinesVga = researches.filter((research) => {
      return research.id === 14 || research.id === 20;
    });

    // берем только ВГА1
    if (vaccinesVga.length > 1) {
      vaccines = researches.filter((research) => {
        return research.id === 13 || research.id === 14;
      });
    }

    const vaccinesBlock = vaccines.map((vaccine, index) => {
      return (
        <div key={index}>
          {vaccine.name} -{' '}
          <select>
            <option>Да</option>
          </select>
        </div>
      );
    });

    return (
      <>
        <tr
          style={{
            borderTop: '1px solid',
          }}
        >
          <td>{vaccinesBlock}</td>
          <td>
            Форма оплаты:{' '}
            <select>
              <option />
              <option>За счет сотрудника</option>
              <option>За счет организации</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <span style={{fontWeight: '600'}}>
              Важно: вы можете провести вакцинацию БЕСПЛАТНО по месту жительства
              по полису ОМС, с предоставлением справки или прививочного
              сертификата.
            </span>
            <br />
            Вакцинация от Вирусного гепатита А проводится двукратно с интервалом 6-18 мес.
            <br />
            Вакцинация от дизентерии Зонне проводится ежегодно
          </td>
        </tr>
      </>
    );
  }

  sendToResearch() {
    const {employeeId} = this.state;
    const {employee} = this.props;

    employee.send_to_research = new Date(Date.now()).toLocaleDateString(
      'ru-RU',
      {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      },
    );

    this.props.dispatch(editEmployeeJson(employee, employeeId));
  }

  getButtons() {
    const {employee} = this.props;
    const sendToResearch = this.sendToResearch.bind(this);

    return (
      <div style={{display: 'flex'}}>
        <Link
          to="#"
          className="btn btn-primary btn-sm pull-left"
          style={{
            color: '#fff',
          }}
          onClick={window.print}
        >
          Печать <i className="icon-printer" />
        </Link>
        <Button
          type="submit"
          size="sm"
          color="success pull-right"
          onClick={sendToResearch}
          style={{marginLeft: '24px'}}
          disabled={employee.send_to_research ? true : false}
        >
          <i className="fa fa-dot-circle-o" />{' '}
          {employee.send_to_research ? 'Отправлен на МО' : 'Отправить на МО'}
        </Button>
      </div>
    );
  }

  render() {
    const {organization, employee, hospital} = this.props;
    const {errors} = this.state;
    const hospitalOrg = hospital[0]; // Пока одна мед организация
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!employee || !hospitalOrg) {
      return (
        <Card>
          <CardHeader>
            <i className="fa fa-dot-circle-o" aria-hidden="true" />
            Что-то пошло не так
          </CardHeader>
          <CardBody className="card-body">
            Возможно нужно добавить{' '}
            <Link to={'/hospitals'}>медицинское учреждение.</Link>
          </CardBody>
        </Card>
      );
    }

    return (
      <div>
        {errorsMessage}
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="12">
              <Card>
                <CardHeader className="d-print-none not-print">
                  {this.getButtons()}
                </CardHeader>
                <CardBody className="card-body">
                  <Table
                    responsive
                    id="printResearches"
                    style={{fontSize: '12px'}}
                  >
                    <tbody>
                      <tr
                        style={{
                          borderTop: '1px solid',
                          borderBottom: '1px solid',
                        }}
                      >
                        <td
                          style={{
                            textAlign: 'center',
                            fontWeight: '600',
                          }}
                          colSpan="2"
                        >
                          Направление на медицинский осмотр
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{width: '50%'}}>
                          <span style={{fontWeight: '600'}}>
                            Наименование объекта:
                          </span>
                          &nbsp;
                          {employee.organization_name}
                        </td>
                        <td colSpan="1" rowSpan="10">
                          <img
                            width="400"
                            height="240"
                            src={hospitalOrg.photo_map}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style={{fontWeight: '600'}}>Сотрудник:</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{width: '50%'}}>
                          ФИО: {employee.fio}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{width: '50%'}}>
                          Дата рождения: {employee.date_birthday}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{width: '50%'}}>
                          Отдел: {employee.department}
                        </td>
                      </tr>
                      <tr>
                        <td>Должность: {employee.position}</td>
                      </tr>
                      <tr>
                        <td>
                          <span style={{fontWeight: '600'}}>
                            Информация о медицинской организации «
                            {hospitalOrg.name}»
                          </span>
                          :
                        </td>
                      </tr>
                      <tr>
                        <td>Адрес: {hospitalOrg.address}</td>
                      </tr>
                      <tr>
                        <td>Режим работы: {hospitalOrg.shedule}</td>
                      </tr>
                      <tr>
                        <td>Телефон: {hospitalOrg.phone}</td>
                      </tr>
                      <tr
                        style={{
                          borderBottom: '1px solid',
                          width: '50%',
                        }}
                      >
                        <td
                          style={{
                            fontWeight: 'italic',
                          }}
                        >
                          * При себе иметь документ удостоверяющий личность и
                          для новой ЛМК фото 3х4
                        </td>
                      </tr>
                      <tr
                        style={{
                          borderTop: '1px solid',
                        }}
                      >
                        <td colSpan="1">
                          <select>
                            <option />
                            <option>Нет</option>
                            <option>Новая</option>
                            <option>Продление</option>
                          </select>{' '}
                          ЛМК
                        </td>
                        <td colSpan="1">
                          Форма оплаты:{' '}
                          <select>
                            <option />
                            <option>За счет сотрудника</option>
                            <option>За счет организации</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">Категория: {employee.category.name}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            textAlign: 'center',
                            fontWeight: '600',
                          }}
                          colSpan="2"
                        >
                          Провести медицинское обследования в объеме:
                        </td>
                      </tr>
                      {this.researches()}
                      <tr
                        style={{
                          borderTop: '1px solid',
                        }}
                      >
                        <td>
                          <select>
                            <option />
                            <option>Нет</option>
                            <option>Предварительный</option>
                            <option>Периодический</option>
                          </select>{' '}
                          медицинский осмотр
                        </td>
                        <td>
                          Форма оплаты:{' '}
                          <select>
                            <option />
                            <option>За счет сотрудника</option>
                            <option>За счет организации</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <span style={{marginRight: '12px'}}>
                            <span style={{fontWeight: '600'}}>1. Отдел:</span>{' '}
                            {employee.department}
                            <br />
                          </span>
                          <span style={{marginRight: '12px'}}>
                            <span style={{fontWeight: '600'}}>
                              2. Должность:
                            </span>{' '}
                            {employee.position}
                            <br />
                          </span>
                        </td>
                      </tr>
                      <tr
                        style={{
                          borderTop: '1px solid',
                        }}
                      >
                        <td>
                          Психиатрическое освидетельствование{' '}
                          <select>
                            <option />
                            <option>Да</option>
                            <option>Нет</option>
                          </select>
                        </td>
                        <td>
                          Форма оплаты:{' '}
                          <select>
                            <option />
                            <option>За счет сотрудника</option>
                            <option>За счет организации</option>
                          </select>
                        </td>
                      </tr>
                      <tr
                        style={{
                          borderTop: '1px solid',
                        }}
                      >
                        <td rowSpan="7">
                          <textarea
                            style={{width: '100%'}}
                            rows="7"
                            defaultValue="Дополнительная информация"
                          />
                        </td>
                        <td />
                      </tr>
                      <tr>
                        <td>
                          <span style={{fontWeight: '600'}}>
                            Сотрудника направил:
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Должность:{' '}
                          {organization && organization.head_position}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          ФИО: {organization && organization.users[0].fio}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Телефон: {organization && organization.head_phone}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Дата:{' '}
                          {new Date(Date.now()).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{width: '50%'}}>
                          Подпись ______________________М.П.
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter className="not-print">
                  {this.getButtons()}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

PrintEmployee.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    employee: state.employees.employee,
    hospital: state.hospitals.hospitals,
    employeeResearches: state.employees.employeeResearches,
    organization: state.organizations.organization,
  };
};

export default connect(mapStateToProps)(PrintEmployee);
