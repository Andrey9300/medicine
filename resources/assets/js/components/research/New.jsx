import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPeriods} from '../../actions/researchPeriodActions';
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
  FormText,
  Label,
  Input,
} from 'reactstrap';
import {createMarkup, getResponseError} from '../../utils/errorsHelper';

class NewResearch extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      errors: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPeriods());
  }

  handleSubmit(event) {
    event.preventDefault();
    const formElement = document.querySelector('form');
    const formData = new FormData(formElement);

    axios
      .post('/researches/store', formData)
      .then(() => {
        history.pushState(null, null, '/services/lmk/researches');
        window.location.reload();
      })
      .catch((errors) => {
        this.setState({
          errors: getResponseError(errors),
        });
      });
  }

  render() {
    const {researchPeriods} = this.props;
    const {errors} = this.state;
    let errorsMessage = '';

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
          <Col xs="12" md="6">
            <Card>
              <CardHeader>Добавить исследование</CardHeader>
              <CardBody className="card-body">
                <Form className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="name" name="name" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Периодичность</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="period_id" id="period_id">
                        {researchPeriods.map((period) => {
                          return (
                            <option key={period.id} value={period.id}>
                              {period.name}
                            </option>
                          );
                        })}
                      </Input>
                      <FormText color="muted">Выберите периодичность</FormText>
                    </Col>
                  </FormGroup>
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

NewResearch.propTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    researchPeriods: state.researchPeriods.researchPeriods,
  };
};

export default connect(mapStateToProps)(NewResearch);
