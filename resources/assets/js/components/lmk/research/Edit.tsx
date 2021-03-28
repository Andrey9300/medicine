import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchResearch} from '../../../actions/lmk/researchActions';
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
import {IResearchPeriod} from '../../../interface/lmk/IResearch';
import {TState} from '../../../reducers';

interface IStateProps {
  research: any;
  periods: IResearchPeriod[];
}

interface IDispatchProps {
  fetchResearch: typeof fetchResearch;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  errors: any;
  researchId: number;
}

class EditResearch extends React.PureComponent<IProps, IState> {
  state: IState = {
    errors: null,
    researchId: null,
  };

  componentDidMount() {
    const {match, fetchResearch} = this.props;
    const researchId = match.params.id;

    this.setState({researchId});
    fetchResearch(researchId);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    const formElement = document.querySelector('form');

    axios
      .post(
        `/researches/update/${this.state.researchId}`,
        new FormData(formElement),
      )
      .then(() => {
        history.pushState(null, null, '/services/lmk/researches');
        window.location.reload();
      })
      .catch((error) => {
        const errors = error;

        this.setState({
          errors: errors,
        });
      });
  };

  componentWillReceiveProps(nextProps: IProps) {
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
    let errorsMessage;

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

const mapStateToProps = (state: TState) => {
  return {
    research: state.researches.research,
    periods: state.researches.periods,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchResearch: (researchId: number) => dispatch(fetchResearch(researchId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditResearch);
