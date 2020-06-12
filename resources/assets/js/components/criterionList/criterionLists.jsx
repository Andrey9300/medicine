import {fetchCriterionLists} from '../../actions/criterionListActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';

class CriterionLists extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchCriterionLists());
  }

  render() {
    const {criterionLists} = this.props;

    if (!criterionLists || criterionLists.length === 0) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="8" lg="8" xl="8">
              <Card className="text-center">
                <CardHeader>Чек листов нет</CardHeader>
                <CardBody>
                  <Link to={'/lmk/criterionLists/create'}>Добавить чек лист</Link>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Чек листы ({criterionLists.length})
                <Link
                  to="/lmk/criterionLists/create"
                  className="btn btn-primary btn-sm pull-right"
                >
                  Добавить <i className="icon-plus" />
                </Link>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Подразделение</th>
                      <th>Локация</th>
                      <th>Помещение</th>
                      <th>Группа критериев</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criterionLists.map((criterionList) => {
                      return (
                        <tr key={criterionList.id}>
                          <td>{criterionList.unit.name}</td>
                          <td>{criterionList.location.name}</td>
                          <td>
                            <Link
                              to={`/lmk/placeCheckList/${criterionList.id}`}
                            >
                              {criterionList.place.name}
                            </Link>
                          </td>
                          <td>{criterionList.groupCriterion.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

CriterionLists.propTypes = {
  dispatch: PropTypes.func.isRequired,
  criterionLists: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    criterionLists: state.criterionLists.criterionLists,
  };
};

export const CriterionListsContainer = connect(mapStateToProps)(CriterionLists);
