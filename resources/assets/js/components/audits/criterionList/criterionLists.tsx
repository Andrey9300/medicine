import {fetchCriterionLists} from '../../../actions/audit/criterionListActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {TState} from '../../../reducers';
import {ICriterionList} from '../../../interface/audit/ICriterionList';

interface IStateProps {
  criterionLists: ICriterionList[];
}

interface IDispatchProps {
  fetchCriterionLists: typeof fetchCriterionLists;
}

interface IProps extends IStateProps, IDispatchProps {}

class CriterionLists extends React.PureComponent<IProps> {
  componentDidMount() {
    const {fetchCriterionLists} = this.props;
    fetchCriterionLists();
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
                  <Link to={'/services/audits/criterionLists/create'}>
                    Добавить чек лист
                  </Link>
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
                  to="/services/audits/criterionLists/create"
                  className="btn btn-primary btn-sm pull-right"
                >
                  Добавить <i className="icon-plus" />
                </Link>
              </CardHeader>
              <CardBody className="card-body">
                <Row>
                  <Col>Подразделение</Col>
                  <Col>Локация</Col>
                  <Col>Помещение</Col>
                  <Col>Группа критериев</Col>
                </Row>
                {criterionLists.map((criterionList) => {
                  return (
                    <Row key={criterionList.id}>
                      <Col>{criterionList.unit.name}</Col>
                      <Col>{criterionList.location.name}</Col>
                      <Col>
                        <Link
                          to={`/services/audits/placeCheckList/${criterionList.id}`}
                        >
                          {criterionList.place.name}
                        </Link>
                      </Col>
                      <Col>{criterionList.groupCriterion.name}</Col>
                    </Row>
                  );
                })}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    criterionLists: state.criterionLists.criterionLists,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchCriterionLists: () => dispatch(fetchCriterionLists()),
  };
};

export const CriterionListsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CriterionLists);
