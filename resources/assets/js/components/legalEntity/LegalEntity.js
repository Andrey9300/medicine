import React from 'react';
import {connect} from 'react-redux';
import {fetchLegalEntity, deleteLegalEntity} from './../../actions/legalEntityActions';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import PropTypes from 'prop-types';

class LegalEntity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            legalEntityId: props.params.id
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchLegalEntity(this.state.legalEntityId));
    }

    handleBtnDelete(legalEntityId, event) {
        event.preventDefault();
        this.props.dispatch(deleteLegalEntity(legalEntityId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {legalEntity} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (legalEntity !== null) {
            formElements =
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <Card>
                                <CardHeader>
                                    «{legalEntity.name}»
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <td>Адрес: </td>
                                                <td>{legalEntity.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Телефон: </td>
                                                <td>{legalEntity.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Инн: </td>
                                                <td>{legalEntity.inn}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Link to={`legalEntities/edit/${legalEntity.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${legalEntity.id}`}
                                                          className="pull-left" method="post">
                                                        <input type="hidden" name="legalEntity_id"
                                                               value={legalEntity.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(legalEntity.id, event)}
                                                           href="#" id={legalEntity.id}>Удалить
                                                            <i className="glyphicon glyphicon-trash"/>
                                                        </a>
                                                    </form>
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
 * @returns {{legalEntity: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        legalEntity: state.legalEntities.legalEntity
    };
}

LegalEntity.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(LegalEntity);
