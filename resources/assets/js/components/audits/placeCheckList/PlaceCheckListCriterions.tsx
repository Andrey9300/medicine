import React from 'react';
import {connect} from 'react-redux';
import {
  deletePlaceCheckList,
  fetchPlaceCheckListCriterions,
} from '../../../actions/audit/placeCheckListActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {IPlaceCheckListCriterion} from '../../../interface/audit/IPlaceCheckList';
import {TState} from '../../../reducers';
import {PlaceComponent} from "../place/Place";
import {IPlace} from "../../../interface/audit/IPlace";

interface IStateProps {
  placeCheckListCriterions: IPlaceCheckListCriterion[];
  place: IPlace;
  fetched: boolean;
  errors: any;
}

interface IDispatchProps {
  fetchPlaceCheckListCriterions: typeof fetchPlaceCheckListCriterions;
  deletePlaceCheckList: typeof deletePlaceCheckList;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  placeCheckListId: number;
}

class PlaceCheckListCriterions extends React.PureComponent<IProps> {
  public state: IState = {
    placeCheckListId: null,
  };

  private map: any = {
    0: 'N',
    1: 'C',
    2: 'B',
    3: 'A',
  };

  componentDidMount() {
    const {fetchPlaceCheckListCriterions, match} = this.props;

    fetchPlaceCheckListCriterions(match.params.id);
    this.setState({placeCheckListId: match.params.id});
  }

  handleBtnDelete = (id: number, event: any) => {
    event.preventDefault();
    const {deletePlaceCheckList} = this.props;

    deletePlaceCheckList(id);
  };

  render() {
    const {placeCheckListId} = this.state;
    const {placeCheckListCriterions, place, errors} = this.props;
    let errorsMessage = null;

    if (!placeCheckListCriterions) {
      return null;
    }

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <PlaceComponent place={place} showCheckList={false} />
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Критерии чек-лист
                <Link
                  to={`/services/audits/placeCheckList/criterions/edit/${placeCheckListId}`}
                  style={{
                    marginLeft: '8px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
              </CardHeader>
              <CardBody className="card-body">
                <Row
                  style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
                >
                  <Col xs="5">Критерий</Col>
                  <Col xs="1">Оценка</Col>
                  <Col xs="3">Комментарий аудитора</Col>
                  <Col xs="3">Комментарий аудируемого</Col>
                </Row>
                {placeCheckListCriterions.map((placeCheckListCriterion) => (
                  <Row
                    key={placeCheckListCriterion.id}
                    style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
                  >
                    <Col xs="5">{placeCheckListCriterion.criterion.name}</Col>
                    <Col xs="1">{this.map[placeCheckListCriterion.mark]}</Col>
                    <Col xs="3">
                      {placeCheckListCriterion.comment_from_auditor}
                    </Col>
                    <Col xs="3">
                      {placeCheckListCriterion.comment_at_auditor}
                    </Col>
                  </Row>
                ))}
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
    placeCheckListCriterions: state.placeCheckLists.placeCheckListCriterions,
    place: state.places.place,
    fetched: state.placeCheckLists.fetched,
    errors: state.placeCheckLists.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchPlaceCheckListCriterions: (id: number) =>
      dispatch(fetchPlaceCheckListCriterions(id)),
    deletePlaceCheckList: (id: number) => dispatch(deletePlaceCheckList(id)),
  };
};

export const PlaceCheckListCriterionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaceCheckListCriterions);
