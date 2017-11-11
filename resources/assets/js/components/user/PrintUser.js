import React from 'react';
import {connect} from 'react-redux';
import {fetchUser} from './../../actions/userActions';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import PropTypes from 'prop-types';

class PrintUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            userId: props.params.id
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchUser(this.state.userId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    researches() {
        const bufferTr = [];
        let bufferTd = [];
        const researches = this.props.user.researches_expired.concat(this.props.user.researches_ended);

        researches.map((research, index) => {
            if (index % 2) {
                bufferTr.push(<tr key={research.id}>{bufferTd}<td>{research.name}</td></tr>);
                bufferTd = [];
            } else {
                bufferTd.push(<td key={research.id}>{research.name}</td>);
            }

            return bufferTd;
        });

        return bufferTr;
    }

    render() {
        const {user} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (user !== null) {
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
                                                        if (user.pay) {
                                                            return 'ОПЛАТА: НАЛИЧНЫМИ';
                                                        }

                                                        return 'ОПЛАТА: БЕЗНАЛИЧНЫЙ РАСЧЕТ';
                                                    })()}

                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    От: «{user.organization.legal_entity}»
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Структурное подразделение / наименование объекта:
                                                    {user.organization_name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Фамилия Имя Отчество сотрудника: {user.fio}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Профессия / должность: {user.role}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Кто направил (ФИО. Должность): {user.organization.head_fio}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Подпись _______________________________
                                                </td>
                                                <td style={{textAlign: 'left'}}>
                                                    {new Date(Date.now()).toLocaleDateString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric' })}</td>
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
                                                    ИНФОРМАЦИЯ О МЕДИЦИНСКОЙ ОРГАНИЗАЦИИ «НВ-Медика»
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Адрес: Петровский бульвар 12 стр. 2, метро «Трубная»<br/>
                                                    Режим работы: пн.- пт. 9.00-18.00 сб. 9.00-17.00, вс-вых.<br/>
                                                    Телефон: 8 (495)-150-16-56
                                                    <img width="670" height="300" src="/img/map_to_medical_center.png" />
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

/**
 * Map
 * @param state
 * @returns {{user: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        user: state.users.user
    };
}

PrintUser.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PrintUser);
