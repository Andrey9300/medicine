import {fetchResearches} from '../../actions/researchActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock,
    Table
} from 'reactstrap';
import PropTypes from 'prop-types';

class Researches extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchResearches());
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-heartbeat" aria-hidden="true"/>Исследования
                                <Link to="researches/create" className="btn btn-primary btn-sm pull-right">
                                    Добавить <i className="icon-plus"/>
                                </Link>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Наименование</th>
                                        <th>Период</th>
                                        <th>Редактировать</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.researches.map((research) => {
                                        return (
                                            <tr key={research.id}>
                                                <td>{research.name}</td>
                                                <td>
                                                    {(() => {
                                                        switch (research.period) {
                                                            case '-1':
                                                                return 'При поступлении на работу.' +
                                                                    'При смене юридического лица';
                                                            case '1':
                                                                return 'Раз в жизни';
                                                            case '365':
                                                                return 'Раз в год';
                                                            case '730':
                                                                return 'Раз в два года';
                                                            case '1827':
                                                                return 'Раз в 5 лет';
                                                            case '3653':
                                                                return 'Раз в 10 лет';
                                                            default :
                                                                return research.period;
                                                        }
                                                    })()}
                                                </td>
                                                <td>
                                                    <Link to={`researches/edit/${research.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редатировать
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

/**
 * Map
 * @param state
 * @returns {{researches: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        researches: state.researches.researches
    };
}

Researches.propTypes = {
    dispatch: PropTypes.func.isRequired,
    researches: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Researches);
