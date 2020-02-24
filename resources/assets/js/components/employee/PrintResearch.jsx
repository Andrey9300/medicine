import React from 'react';
import {connect} from 'react-redux';
import {fetchEmployee} from './../../actions/employeeActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import {fetchHospitals} from '../../actions/hospitalActions';

class PrintEmployee extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      errors: null,
      employeeId: props.match.params.id,
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchEmployee(this.state.employeeId));
    this.props.dispatch(fetchHospitals());
  }

  createMarkup() {
    const {errors} = this.state;

    return Object.keys(errors).map((item) => {
      return errors[item].map((value, index) => {
        return <p key={index}>{value}</p>;
      });
    });
  }

  researches() {
    const {employee} = this.props;
    const bufferTr = [];
    let bufferTd = [];
    const researches = employee.researches_expired.concat(
      employee.researches_ends,
    );
    // в отдельный раздел псих. осв., предварительный / периодический МО
    const filterResearches = researches.filter((research) => {
      return research.id !== 19 || research.id !== 18;
    });

    filterResearches.forEach((research, index) => {
      let note = false;
      if (research.id === 13 || research.id === 14 || research.id === 20) {
        note = true;
      }

      if (index % 2) {
        bufferTr.push(
          <tr key={research.id}>
            {bufferTd}
            <td style={{fontWeight: note ? '600' : null}}>
              {research.name} {note && '*'}
            </td>
          </tr>,
        );
        bufferTd = [];
      } else {
        bufferTd.push(
          <td key={research.id} style={{fontWeight: note ? '600' : null}}>
            {research.name} {note && <span>*</span>}
          </td>,
        );
      }
    });

    if (
      (bufferTr.length % 2 === 1 && bufferTd.length) ||
      (bufferTr.length === 0 && bufferTd.length)
    ) {
      bufferTr.push(<tr key={1}>{bufferTd}</tr>);
    }

    return bufferTr;
  }

  render() {
    const {employee, hospital} = this.props;
    const {errors} = this.state;
    const hospitalOrg = hospital[0]; // Пока одна мед организация
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {this.createMarkup()}
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
          <CardBlock className="card-body">
            Возможно нужно добавить{' '}
            <Link to={'/hospitals'}>медицинское учреждение.</Link>
          </CardBlock>
        </Card>
      );
    }

    let decree = null;

    if (employee.category.id === 1) {
      decree = 'п.23 приложение 2, п. 3.2.2.4 Приложение 1.';
    } else if (employee.category.id === 2) {
      decree = 'п.15, п.23 Приложение 2';
    }

    return (
      <div>
        {errorsMessage}
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="12">
              <Card>
                <CardHeader className="d-print-none" onClick={window.print}>
                  <Link
                    to="#"
                    className="btn btn-primary btn-sm pull-left"
                    style={{
                      color: '#fff',
                    }}
                  >
                    Печать <i className="icon-printer" />
                  </Link>
                </CardHeader>
                <CardBlock className="card-body">
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
                          Структурное подразделение / наименование
                          объекта:&nbsp;
                          {employee.organization_name}
                        </td>
                        <td colSpan="1">
                          Информация о медицинской организации «
                          {hospitalOrg.name}»:
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{width: '50%'}}>
                          ФИО, дата рождения: {employee.fio},{' '}
                          {employee.date_birthday}
                        </td>
                        <td colSpan="1" rowSpan="4">
                          <img
                            width="300"
                            height="150"
                            src={hospitalOrg.photo_map}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{width: '50%'}}>
                          Отдел: {employee.department}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{width: '50%'}}>
                          Профессия / должность: {employee.position}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{width: '50%'}}>
                          Кто направил (ФИО. Должность):{' '}
                          {employee.organization.head_fio}
                        </td>
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
                          colSpan="1"
                        >
                          * При себе иметь документ удостоверяющий личность и
                          для новой ЛМК фото 3х4
                        </td>

                        <td colSpan="1">
                          Адрес: {hospitalOrg.address} Режим работы:{' '}
                          {hospitalOrg.shedule} Телефон: {hospitalOrg.phone}
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
                      {employee.category.id === 2 && (
                        <>
                          <tr
                            style={{
                              borderTop: '1px solid',
                              fontWeight: '600',
                            }}
                          >
                            <td>Вакцинация</td>
                            <td>
                              Форма оплаты:{' '}
                              <select>
                                <option />
                                <option>За счет сотрудника</option>
                                <option>За счет организации</option>
                              </select>
                            </td>
                          </tr>
                          <tr style={{fontWeight: '600'}}>
                            <td colSpan="2">
                              * Вы можете провести вакцинацию БЕСПЛАТНО по месту
                              жительства по полису ОМС, с предоставлением
                              справки или прививочного сертификата.
                              <br />
                              Прививка против гепатита, проводится двукратно с
                              интервалом 6-12 мес.
                              <br />
                              Прививка против дизентерии проводится ежегодно.
                            </td>
                          </tr>
                        </>
                      )}
                      <tr
                        style={{
                          borderTop: '1px solid',
                        }}
                      >
                        <td>
                          <select>
                            <option />
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
                            <span style={{fontWeight: '600'}}>2. Отдел:</span>{' '}
                            {employee.department}
                            <br />
                          </span>
                          <span style={{marginRight: '12px'}}>
                            <span style={{fontWeight: '600'}}>
                              3. Должность:
                            </span>{' '}
                            {employee.position}
                            <br />
                          </span>
                          <span style={{marginRight: '12px'}}>
                            <span style={{fontWeight: '600'}}>
                              4. Пункты приказа:
                            </span>{' '}
                            {decree}
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
                        <td rowSpan="5">
                          <textarea
                            style={{width: '100%'}}
                            rows="5"
                            defaultValue="Дополнительная информация"
                          />
                        </td>
                        <td />
                      </tr>
                      <tr>
                        <td>
                          Контактное лицо:{' '}
                          <input type="text" style={{width: '200px'}} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Телефон:{' '}
                          <input type="text" style={{width: '200px'}} />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{width: '50%'}}>
                          Подпись ______________________
                          {new Date(Date.now()).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td>М.П.</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBlock>
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
  };
};

export default connect(mapStateToProps)(PrintEmployee);
