import {deleteResearch, fetchResearches} from '../../actions/researchActions';
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

class Researches extends React.Component {

    constructor() {
        super();
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchResearches());
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteResearch(id));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>Исследования
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Наименование</th>
                                        <th>Период</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.researches.map((research, index) => {
                                        return (
                                            <tr key={research.id}>
                                                <td>{research.name}</td>
                                                <td>
                                                    {(() => {
                                                        switch (research.period) {
                                                            case '-1':
                                                                return 'При поступлении на работу. При смене юридического лица';
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
                                                        <i className="glyphicon glyphicon-pencil"></i>
                                                    </Link>
                                                    <form id={`form_${research.id}`} className="pull-left" method="post">
                                                        <input type="hidden" name="research_id" value={research.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(research.id, event)}
                                                           href="#" id={research.id}>Удалить
                                                            <i className="glyphicon glyphicon-trash"></i>
                                                        </a>
                                                    </form>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </Table>
                                <Link to="researches/create" className="btn btn-primary btn-sm pull-left">
                                    Добавить &nbsp; <i className="glyphicon glyphicon-plus"></i>
                                </Link>
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
export default connect(mapStateToProps)(Researches);
