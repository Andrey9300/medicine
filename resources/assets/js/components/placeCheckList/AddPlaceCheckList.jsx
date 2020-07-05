import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  addPlaceCheckList,
  fetchPlaceCheckList,
} from '../../actions/audit/placeCheckListActions';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Input,
  Button,
  CardFooter,
  FormGroup,
  Form,
  Label,
} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

class AddPlaceCheckListCheckList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeCheckListId: props.match.params.id,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPlaceCheckList(this.state.placeCheckListId));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      addPlaceCheckList(
        document.querySelector('form'),
        this.state.placeCheckListId,
      ),
    );
  }

  render() {
    const {placeCheckList, errors} = this.props;
    let errorsMessage = '';

    if (!placeCheckList) {
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
          <Col xs="12" sm="12" md="12" lg="8" xl="8">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Провести аудит
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Подразделение:</td>
                      <td>{placeCheckList.unit.name}</td>
                    </tr>
                    <tr>
                      <td>Локация:</td>
                      <td>{placeCheckList.location.name}</td>
                    </tr>
                    <tr>
                      <td>Помещение:</td>
                      <td>{placeCheckList.place.name}</td>
                    </tr>
                    <tr>
                      <td>Группа критериев:</td>
                      <td>{placeCheckList.groupCriterion.name}</td>
                    </tr>
                    <tr>
                      <td>Дата:</td>
                      <td>
                        {new Date(Date.now()).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="12" lg="8" xl="8">
            <Card>
              <CardBody>
                <Form className="form-horizontal">
                  <Table responsive>
                    <tbody>
                      <tr>
                        <td>
                          <b>Критерий</b>
                        </td>
                        <td colSpan="4">
                          <b>Оценка</b>
                        </td>
                        <td>
                          <b>Комментарий</b>
                        </td>
                      </tr>
                      {placeCheckList.criterions.map((criterion) => (
                        <tr key={criterion.id}>
                          <td style={{maxWidth: '400px'}}>
                            <Input
                              type="hidden"
                              id="criterionId"
                              name={`criterionId[${criterion.id}]`}
                              defaultValue={criterion.id}
                            />
                            {criterion.name}
                          </td>
                          <td>
                            <Input
                              type="radio"
                              name={`mark[${criterion.id}]`}
                              value="3"
                              style={{width: '20px', height: '20px'}}
                            />
                            <span style={{color: 'green', fontWeight: 'bold'}}>
                              A
                            </span>
                          </td>
                          <td>
                            <Input
                              type="radio"
                              name={`mark[${criterion.id}]`}
                              value="2"
                              style={{width: '20px', height: '20px'}}
                            />
                            <span
                              style={{color: '#d39e00', fontWeight: 'bold'}}
                            >
                              B
                            </span>
                          </td>
                          <td>
                            <Input
                              type="radio"
                              name={`mark[${criterion.id}]`}
                              value="1"
                              style={{width: '20px', height: '20px'}}
                            />
                            <span style={{color: 'red', fontWeight: 'bold'}}>
                              C
                            </span>
                          </td>
                          <td>
                            <Input
                              type="radio"
                              name={`mark[${criterion.id}]`}
                              value="0"
                              style={{width: '20px', height: '20px'}}
                              onChange={() => {}}
                              checked
                            />
                            <span style={{color: 'black', fontWeight: 'bold'}}>
                              N
                            </span>
                          </td>
                          <td>
                            <Input
                              type="textarea"
                              name={`comment[${criterion.id}]`}
                              placeholder="Комментарий"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  size="sm"
                  color="success"
                  onClick={this.handleSubmit}
                >
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

AddPlaceCheckListCheckList.propTypes = {
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    placeCheckList: state.placeCheckLists.placeCheckList,
    fetched: state.placeCheckLists.fetched,
    errors: state.placeCheckLists.errors,
  };
};

export const AddPlaceCheckListContainer = connect(mapStateToProps)(
  AddPlaceCheckListCheckList,
);
