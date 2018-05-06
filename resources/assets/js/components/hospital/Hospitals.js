import {deleteHospital, fetchHospitals} from '../../actions/hospitalActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class Hospitals extends React.Component {
    constructor() {
        super();
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchHospitals());
    }

    handleBtnDelete(hospitalId, event) {
        event.preventDefault();
        this.props.dispatch(deleteHospital(hospitalId));
    }

    render() {
        const {user, hospitals} = this.props;
        let linkAdd = null;

        if (!hospitals) {
            return (
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" sm="6" md="4">
                            <Card className="text-center">
                                <CardHeader>
                                    Медицинских центров нет
                                </CardHeader>
                                <CardBlock>
                                    <Link to={'hospitals/create'}>
                                        Добавить медицинский центр
                                    </Link>
                                </CardBlock>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
        // Пока ограничиваемся одним мед центром
        if (user && user.role === 'admin' && hospitals.length < 1) {
            linkAdd =
                <Link to="hospitals/create" className="btn btn-primary btn-sm pull-right">
                    Добавить <i className="icon-plus"/>
                </Link>;
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-stethoscope" aria-hidden="true"/>
                                Медицинские центры
                                ({hospitals.length})
                                {linkAdd}
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Название</th>
                                            <th>Адрес</th>
                                            <th>Контактное лицо</th>
                                            <th>Телефон</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {hospitals.map((hospital) => {
                                        return (
                                            <tr key={hospital.id}>
                                                <td>
                                                    <Link to={`hospitals/${hospital.id}`}>
                                                        {hospital.name}
                                                    </Link>
                                                </td>
                                                <td>{hospital.address}</td>
                                                <td>{hospital.head_fio}</td>
                                                <td>{hospital.phone}</td>
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

const mapStateToProps = (state) => {
    return {
        hospitals: state.hospitals.hospitals,
        user: state.users.user
    };
};

export default connect(mapStateToProps)(Hospitals);
