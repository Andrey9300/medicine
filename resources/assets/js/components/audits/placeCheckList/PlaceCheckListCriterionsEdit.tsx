import React from 'react';
import {connect} from 'react-redux';
import {
  editPlaceCheckList,
  fetchCheckList,
  fetchPlaceCheckListCriterions,
  finishAudit,
} from '../../../actions/audit/placeCheckListActions';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {IPlaceCheckListCriterion} from '../../../interface/audit/IPlaceCheckList';
import {TState} from '../../../reducers';
import {ICheckList} from '../../../interface/audit/CheckList';
import {PlaceComponent} from '../place/Place';
import {IPlace} from '../../../interface/audit/IPlace';

interface IStateProps {
  checkList: ICheckList;
  placeCheckListCriterions: IPlaceCheckListCriterion[];
  place: IPlace;
  fetched: boolean;
  errors: any;
}

interface IDispatchProps {
  fetchPlaceCheckListCriterions: typeof fetchPlaceCheckListCriterions;
  editPlaceCheckList: typeof editPlaceCheckList;
  fetchCheckList: typeof fetchCheckList;
  finishAudit: typeof finishAudit;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  placeCheckListId: number;
}

class PlaceCheckListCriterionsEdit extends React.PureComponent<IProps> {
  public state: IState = {
    placeCheckListId: null,
  };

  componentDidMount() {
    const {match, fetchCheckList, fetchPlaceCheckListCriterions} = this.props;

    fetchPlaceCheckListCriterions(match.params.id);
    fetchCheckList(match.params.id);
    this.setState({placeCheckListId: match.params.id});
  }

  handleClick = (event: any) => {
    event.preventDefault();
    const {placeCheckListId} = this.state;
    const {finishAudit} = this.props;

    finishAudit(placeCheckListId);
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const {placeCheckListId} = this.state;
    const {editPlaceCheckList} = this.props;

    editPlaceCheckList(document.querySelector('form'), placeCheckListId);
  };

  render() {
    const {placeCheckListCriterions, checkList, place, errors} = this.props;
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
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>
                  <Row>
                    <Col lg="3">Редактировать чек-лист</Col>
                    <Col lg="6">
                      <Button
                        type="submit"
                        size="sm"
                        color="primary"
                        disabled={!!checkList?.sended}
                        onClick={this.handleClick}
                      >
                        <i className="fa fa-dot-circle-o" />
                        {checkList?.sended
                          ? ' Аудит проведен'
                          : ' Закончить аудит'}
                      </Button>
                    </Col>
                    <Col lg="3">
                      <Button type="submit" size="sm" color="success">
                        <i className="fa fa-dot-circle-o" /> Сохранить изменения
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col lg="5">
                      <Label>Критерий</Label>
                    </Col>
                    <Col lg="1">
                      <Label>Оценка</Label>
                    </Col>
                    <Col lg="3">
                      <Label>Комментарий аудтиора</Label>
                    </Col>
                    <Col lg="3">
                      <Label>Комментарий аудируемого</Label>
                    </Col>
                  </FormGroup>
                  {placeCheckListCriterions.map(
                    (placeCheckListCriterion, index) => (
                      <FormGroup row key={index}>
                        <Col lg="5">
                          <Input
                            type="hidden"
                            id="criterionId"
                            name={`placeCheckListCriterion[${placeCheckListCriterion.id}]`}
                            defaultValue={placeCheckListCriterion.criterion.id}
                          />
                          {placeCheckListCriterion.criterion.name}
                        </Col>
                        <Col lg="1">
                          <div>
                            <Input
                              type="radio"
                              name={`mark[${placeCheckListCriterion.id}]`}
                              value="3"
                              defaultChecked={
                                placeCheckListCriterion.mark === '3'
                              }
                            />
                            <span style={{color: 'green', fontWeight: 'bold'}}>
                              A
                            </span>
                          </div>
                          <div>
                            <Input
                              type="radio"
                              name={`mark[${placeCheckListCriterion.id}]`}
                              value="2"
                              defaultChecked={
                                placeCheckListCriterion.mark === '2'
                              }
                            />
                            <span
                              style={{color: '#d39e00', fontWeight: 'bold'}}
                            >
                              B
                            </span>
                          </div>
                          <div>
                            <Input
                              type="radio"
                              name={`mark[${placeCheckListCriterion.id}]`}
                              value="1"
                              defaultChecked={
                                placeCheckListCriterion.mark === '1'
                              }
                            />
                            <span style={{color: 'red', fontWeight: 'bold'}}>
                              C
                            </span>
                          </div>
                          <div>
                            <Input
                              type="radio"
                              name={`mark[${placeCheckListCriterion.id}]`}
                              value="0"
                              defaultChecked={
                                placeCheckListCriterion.mark === '0'
                              }
                            />
                            <span style={{color: 'black', fontWeight: 'bold'}}>
                              N
                            </span>
                          </div>
                        </Col>
                        <Col lg="3">
                          <Input
                            type="textarea"
                            name={`comment_from_auditor[${placeCheckListCriterion.id}]`}
                            defaultValue={
                              placeCheckListCriterion.comment_from_auditor
                            }
                            readOnly={!!checkList?.sended}
                          />
                        </Col>
                        <Col lg="3">
                          <Input
                            type="textarea"
                            name={`comment_at_auditor[${placeCheckListCriterion.id}]`}
                            defaultValue={
                              placeCheckListCriterion.comment_at_auditor
                            }
                          />
                        </Col>
                      </FormGroup>
                    ),
                  )}
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="success">
                    <i className="fa fa-dot-circle-o" /> Сохранить
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    checkList: state.placeCheckLists.checkList,
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
    editPlaceCheckList: (form: HTMLFormElement, id: number) =>
      dispatch(editPlaceCheckList(form, id)),
    finishAudit: (id: number) => dispatch(finishAudit(id)),
    fetchCheckList: (id: number) => dispatch(fetchCheckList(id)),
  };
};

export const PlaceCheckListCriterionsEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaceCheckListCriterionsEdit);
