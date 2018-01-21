import React from 'react';
import {connect} from 'react-redux';
import {fetchEmployee} from './../../actions/employeeActions';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import {fetchHospitals} from '../../actions/hospitalActions';

class PrintEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            employeeId: props.params.id
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchEmployee(this.state.employeeId));
        this.props.dispatch(fetchHospitals());
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    researches() {
        const bufferTr = [];
        let bufferTd = [];
        const researches = this.props.employee.researches_expired.concat(this.props.employee.researches_ends);

        researches.map((research, index) => {
            if (index % 2) {
                bufferTr.push(<tr key={research.id}>{bufferTd}<td>{research.name}</td></tr>);
                bufferTd = [];
            } else {
                bufferTd.push(<td key={research.id}>{research.name}</td>);
            }
        });

        if ((bufferTr.length % 2 === 1 && bufferTd.length) || (bufferTr.length === 0 && bufferTd.length)) {
            bufferTr.push(<tr key={1}>{bufferTd}</tr>);
        }

        return bufferTr;
    }

    render() {
        const {employee} = this.props;
        const hospital = this.props.hospital[0];
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (employee !== null) {
            formElements =
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <Card>
                                <CardHeader className="d-print-none" onClick={window.print}>
                                    <Link className="btn btn-primary btn-sm pull-left" style={{color: "#fff"}}>
                                        Печать <i className="icon-printer"/>
                                    </Link>
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive id="printResearches">
                                        <tbody>
                                            <tr style={{borderTop: '1px solid', borderBottom: '1px solid'}}>
                                                <td style={{textAlign: 'center', fontWeight: 'bold'}} colSpan="2">
                                                    НАПРАВЛЕНИЕ НА МЕДИЦИНСКИЙ ОСМОТР
                                                </td>
                                            </tr>
                                            <tr style={{fontWeight: 'bold'}}>
                                                <td colSpan="2">
                                                    {(() => {
                                                        if (employee.pay) {
                                                            return 'ОПЛАТА: НАЛИЧНЫМИ';
                                                        }

                                                        return 'ОПЛАТА: БЕЗНАЛИЧНЫЙ РАСЧЕТ';
                                                    })()}

                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    От: «{employee.legal_entity}»
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Структурное подразделение / наименование объекта:
                                                    {employee.organization_name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Фамилия Имя Отчество сотрудника: {employee.fio}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Профессия / должность: {employee.role}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Кто направил (ФИО. Должность): {employee.organization.head_fio}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Подпись _______________________________
                                                </td>
                                                <td style={{textAlign: 'left'}}>
                                                    {new Date(Date.now()).toLocaleDateString('ru-RU',
                                                        {year: 'numeric', month: 'long', day: 'numeric' })}
                                                </td>
                                            </tr>
                                            <tr style={{borderBottom: '1px solid'}}>
                                                <td style={{ textAlign: 'right', fontWeight: 'italic'}} colSpan="2">
                                                    * При себе иметь документ удостоверяющий личность
                                                </td>
                                            </tr>
                                            <tr style={{borderTop: '1px solid', borderBottom: '1px solid'}}>
                                                <td style={{textAlign: 'center', fontWeight: 'bold'}} colSpan="2">
                                                    ПРОВЕСТИ МЕДИЦИНСКОЕ ОБСЛЕДОВАНИЕ В ОБЪЕМЕ:
                                                </td>
                                            </tr>

                                            {this.researches()}

                                            <tr style={{borderTop: '1px solid', borderBottom: '1px solid'}}>
                                                <td style={{textAlign: 'center', fontWeight: 'bold'}} colSpan="2">
                                                    ИНФОРМАЦИЯ О МЕДИЦИНСКОЙ ОРГАНИЗАЦИИ «{hospital.name}»
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Адрес: {hospital.address}<br/>
                                                    Режим работы: {hospital.shedule}<br/>
                                                    Телефон: {hospital.phone}
                                                    <img width="670" height="300" src={hospital.photo_map}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBlock>
                            </Card>
                        </Col>
                    </Row>
                </div>;
        }

        return (
            <div>
                {errors}
                {formElements}
            </div>
        );
    }
}

PrintEmployee.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        employee: state.employees.employee,
        hospital: state.hospitals.hospitals
    };
};

export default connect(mapStateToProps)(PrintEmployee);
