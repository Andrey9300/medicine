import React from 'react';
import {connect} from 'react-redux';
import {fetchPlaceCheckListCriterions} from '../../../actions/audit/placeCheckListActions';
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

interface IStateProps {
  placeCheckListCriterions: IPlaceCheckListCriterion[];
  fetched: boolean;
  errors: any;
}

interface IDispatchProps {
  fetchPlaceCheckListCriterions: typeof fetchPlaceCheckListCriterions;
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
    const {match, fetchPlaceCheckListCriterions} = this.props;

    fetchPlaceCheckListCriterions(match.params.id);
    this.setState({placeCheckListId: match.params.id});
  }

  handleClick = (event: any) => {
    event.preventDefault();
    // this.props.dispatch(deletePlaceCheckList(id));
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    // this.props.dispatch(deletePlaceCheckList(id));
  };

  render() {
    const {placeCheckListId} = this.state;
    const {placeCheckListCriterions, errors} = this.props;
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
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col lg="3">Редактировать чек-лист</Col>
                  <Col lg="6">
                    <Button
                      type="submit"
                      size="sm"
                      color="primary"
                      onClick={this.handleClick}
                    >
                      <i className="fa fa-dot-circle-o" /> Закончить аудит
                    </Button>
                  </Col>
                  <Col lg="3">
                    <Button type="submit" size="sm" color="success">
                      <i className="fa fa-dot-circle-o" /> Сохранить изменения
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
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
                            id="comment"
                            name="comment"
                            defaultValue={
                              placeCheckListCriterion.comment_from_auditor
                            }
                          />
                        </Col>
                        <Col lg="3">
                          <Input
                            type="textarea"
                            id="comment"
                            name="comment"
                            defaultValue={
                              placeCheckListCriterion.comment_at_auditor
                            }
                          />
                        </Col>
                      </FormGroup>
                    ),
                  )}
                </CardBody>
              </Form>
              <CardFooter>
                <Button type="submit" size="sm" color="success">
                  <i className="fa fa-dot-circle-o" /> Сохранить
                </Button>
              </CardFooter>
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
    fetched: state.placeCheckLists.fetched,
    errors: state.placeCheckLists.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchPlaceCheckListCriterions: (id: number) =>
      dispatch(fetchPlaceCheckListCriterions(id)),
  };
};

export const PlaceCheckListCriterionsEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaceCheckListCriterionsEdit);
