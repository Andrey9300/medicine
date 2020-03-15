import React from 'react';
import {connect} from 'react-redux';
import {
  deletePlaceCheckList,
  fetchPlaceCheckListCriterions,
} from './../../actions/placeCheckListActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
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
import {createMarkup} from '../../utils/errorsHelper';

class PlaceCheckListCriterionsEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeCheckListId: props.match.params.id,
    };

    this.map = {
      0: 'N',
      1: 'C',
      2: 'B',
      3: 'A',
    };
  }

  componentDidMount() {
    this.props.dispatch(
      fetchPlaceCheckListCriterions(this.state.placeCheckListId),
    );
  }

  handleClick(id, event) {
    event.preventDefault();
    // this.props.dispatch(deletePlaceCheckList(id));
  }

  render() {
    const {placeCheckListId} = this.state;
    const {placeCheckListCriterions, errors} = this.props;
    let errorsMessage = '';

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
                    <Col lg="4">
                      <Label>Критерий</Label>
                    </Col>
                    <Col lg="2">
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
                        <Col lg="4">
                          {placeCheckListCriterion.criterion.name}
                        </Col>
                        <Col
                          lg="2"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                          }}
                        >
                          <div>
                            <Input
                              type="radio"
                              name={`mark[${placeCheckListCriterion.id}]`}
                              value="3"
                              style={{width: '20px', height: '20px'}}
                              checked={placeCheckListCriterion.mark === "3"}
                              onChange={() => {}}
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
                              style={{width: '20px', height: '20px'}}
                              checked={placeCheckListCriterion.mark === "2"}
                              onChange={() => {}}
                            />
                            <span style={{color: '#d39e00', fontWeight: 'bold'}}>
                              B
                            </span>
                          </div>
                          <div>
                            <Input
                              type="radio"
                              name={`mark[${placeCheckListCriterion.id}]`}
                              value="1"
                              style={{width: '20px', height: '20px'}}
                              checked={placeCheckListCriterion.mark === "1"}
                              onChange={() => {}}
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
                              style={{width: '20px', height: '20px'}}
                              checked={placeCheckListCriterion.mark === "0"}
                              onChange={() => {}}
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

PlaceCheckListCriterionsEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    placeCheckListCriterions: state.placeCheckLists.placeCheckListCriterions,
    fetched: state.placeCheckLists.fetched,
    errors: state.placeCheckLists.errors,
  };
};

export const PlaceCheckListCriterionsEditContainer = connect(mapStateToProps)(
  PlaceCheckListCriterionsEdit,
);
