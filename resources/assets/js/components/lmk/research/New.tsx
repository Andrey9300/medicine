import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchPeriods} from '../../../actions/lmk/researchPeriodActions';
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
import {createMarkup, getResponseError} from '../../../utils/errorsHelper';
import {IResearchPeriod} from '../../../interface/lmk/IResearch';
import {TState} from '../../../reducers';

interface IStateProps {
  researchPeriods: IResearchPeriod[];
}

interface IDispatchProps {
  fetchPeriods: typeof fetchPeriods;
}

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
  errors: any;
}

class NewResearch extends React.PureComponent<IProps, IState> {
  state: IState = {
    errors: null,
  };

  componentDidMount() {
    const {fetchPeriods} = this.props;
    fetchPeriods();
  }

  handleSubmit = (event: any) => {
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
  };

  render() {
    const {researchPeriods} = this.props;
    const {errors} = this.state;
    let errorsMessage;

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

const mapStateToProps = (state: TState) => {
  return {
    researchPeriods: state.researchPeriods.researchPeriods,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchPeriods: () => dispatch(fetchPeriods()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewResearch);
