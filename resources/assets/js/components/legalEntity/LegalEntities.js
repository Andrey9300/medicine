import {deleteLegalEntity, fetchLegalEntities} from '../../actions/legalEntityActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class LegalEntities extends React.Component {
    constructor() {
        super();
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchLegalEntities());
    }

    handleBtnDelete(legalEntityId, event) {
        event.preventDefault();
        this.props.dispatch(deleteLegalEntity(legalEntityId));
    }

    render() {
        const {legalEntities} = this.props;

        if (legalEntities === null) {
            return null;
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-briefcase" aria-hidden="true"/>Юридические лица
                                ({legalEntities.length})
                                <Link to="legalEntities/create" className="btn btn-primary btn-sm pull-right">
                                    Добавить <i className="icon-plus"/>
                                </Link>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Адрес</th>
                                        <th>Телефон</th>
                                        <th>ИНН</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {legalEntities.map((legalEntity) => {
                                        return (
                                            <tr key={legalEntity.id}>
                                                <td>
                                                    <Link to={`legalEntities/${legalEntity.id}`}>
                                                        {legalEntity.name}
                                                    </Link>
                                                </td>
                                                <td>{legalEntity.address}</td>
                                                <td>{legalEntity.phone}</td>
                                                <td>{legalEntity.inn}</td>
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
        legalEntities: state.legalEntities.legalEntities
    };
};

export default connect(mapStateToProps)(LegalEntities);
