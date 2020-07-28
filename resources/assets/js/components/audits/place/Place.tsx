import React from 'react';
import {
  fetchPlace,
  deletePlace,
  clearPlace,
} from '../../../actions/audit/placeActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {IPlace} from '../../../interface/audit/IPlace';
import {CheckListsComponent} from '../checkLists/CheckLists';
import {fetchPlaceCheckList} from '../../../actions/audit/placeCheckListActions';
import {ICriterionList} from '../../../interface/audit/ICriterionList';

interface IPlaceStateProps {
  place: IPlace;
  placeCheckList?: ICriterionList;
  fetched?: boolean;
  errors?: any;
}

export interface IPlaceDispatchProps {
  clearPlace?: typeof clearPlace;
  fetchPlace?: typeof fetchPlace;
  deletePlace?: typeof deletePlace;
  fetchPlaceCheckList?: typeof fetchPlaceCheckList;
}

interface IPlaceProps extends IPlaceStateProps, IPlaceDispatchProps {
  match?: any;
}

export class PlaceComponent extends React.PureComponent<IPlaceProps> {
  componentDidMount() {
    const {clearPlace, fetchPlaceCheckList, fetchPlace, match} = this.props;

    if (!match) {
      return;
    }

    clearPlace();
    fetchPlaceCheckList(match.params.id);
    fetchPlace(match.params.id);
  }

  handleBtnDelete = (id: number, event: any) => {
    event.preventDefault();
    const {deletePlace} = this.props;

    const result = confirm(
      'Удаление приведет к потере данных аудита по данному помещению. Удалить?',
    );

    if (result) {
      deletePlace(id);
    }
  };

  render() {
    const {place, placeCheckList, errors} = this.props;
    let errorsMessage = null;

    if (!place) {
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
      <Row>
        <Col xs="12" sm="12" md="8" lg="8" xl="8">
          <Card>
            {errorsMessage}
            <CardHeader>
              <i className="fa fa-building-o" aria-hidden="true" />
              Помещение
              <Link
                to={`/services/audits/place/edit/${place.id}`}
                style={{
                  marginLeft: '18px',
                }}
              >
                <i className="fa fa-pencil" />
              </Link>
              <span
                className="pull-right"
                onClick={(event) => this.handleBtnDelete(place.id, event)}
              >
                <i className="fa fa-trash" />
              </span>
            </CardHeader>
            <CardBody className="card-body">
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Подразделение:</Col>
                <Col>{place.unit?.name}</Col>
              </Row>
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Локация:</Col>
                <Col>{place.location?.name}</Col>
              </Row>
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Помещение:</Col>
                <Col>
                  <Link to={`/services/audits/place/${place.id}`}>
                    {place.name}
                  </Link>
                </Col>
              </Row>
              {placeCheckList && (
                <Row
                  style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
                >
                  <Col>Чек лист:</Col>
                  <Col>
                    {placeCheckList?.groupCriterion?.name}
                    {!placeCheckList?.groupCriterion?.name && (
                      <Link to={`/services/audits/place/edit/${place.id}`}>
                        укажите чек лист
                      </Link>
                    )}
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
        {placeCheckList && (
          <CheckListsComponent
            placeId={place.id}
            placeCheckLists={placeCheckList}
          />
        )}
      </Row>
    );
  }
}
