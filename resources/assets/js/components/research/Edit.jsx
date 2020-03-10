import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchResearch} from './../../actions/researchActions';
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
  FormText,
  Label,
  Input,
} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

class EditResearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      researchId: props.match.params.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formElement = document.querySelector('form');

    axios
      .post(
        `/researches/update/${this.state.researchId}`,
        new FormData(formElement),
      )
      .then(() => {
        history.pushState(null, null, '/researches');
        window.location.reload();
      })
      .catch((error) => {
        const errors = error;

        this.setState({
          errors: errors,
        });
      });
  }

  componentDidMount() {
    this.props.dispatch(fetchResearch(this.state.researchId));
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.research &&
      nextProps.research &&
      nextProps.research.name !== this.props.research.name
    ) {
      window.location.reload();
    }
  }

  render() {
    const {research} = this.props;
    const {errors} = this.state;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!research) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>Редактировать исследование</CardHeader>
              <CardBody className="card-body">
                <Form className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={research.name}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Период</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="select"
                        name="period_id"
                        id="select"
                        defaultValue={research.research_period.id}
                      >
                        {this.props.periods.map((period) => {
                          return (
                            <option key={period.id} value={period.id}>
                              {period.name}
                            </option>
                          );
                        })}
                      </Input>
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

EditResearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  periods: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    research: state.researches.research,
    periods: state.researches.periods,
  };
};

export default connect(mapStateToProps)(EditResearch);
