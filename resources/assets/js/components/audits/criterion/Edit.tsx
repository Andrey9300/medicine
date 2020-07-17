import React from 'react';
import {connect} from 'react-redux';
import {
  clearCriterion,
  fetchCriterion,
} from '../../../actions/audit/criterionActions';
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
import {editCriterion} from '../../../actions/audit/criterionActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';
import {ICriterion} from '../../../interface/audit/ICriterion';

interface IStateProps {
  criterion: ICriterion;
  errors: any;
}

interface IDispatchProps {
  editCriterion: typeof editCriterion;
  clearCriterion: typeof clearCriterion;
  fetchCriterion: typeof fetchCriterion;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  criterionId: number;
}

class EditCriterion extends React.PureComponent<IProps> {
  public state: IState = {
    criterionId: null,
  };

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {criterionId} = this.state;
    const {editCriterion} = this.props;

    editCriterion(document.querySelector('form'), criterionId);
  };

  componentDidMount() {
    const {match, clearCriterion, fetchCriterion} = this.props;

    this.setState({criterionId: match.params.id});
    clearCriterion();
    fetchCriterion(match.params.id);
  }

  render() {
    const {criterion, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!criterion) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать критерий</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="textarea"
                        name="name"
                        id="name"
                        rows="5"
                        cols="33"
                        defaultValue={criterion.name}
                      />
                    </Col>
                  </FormGroup>
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
    errors: state.criterions.errors,
    criterion: state.criterions.criterion,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    editCriterion: (form: HTMLFormElement, id: number) =>
      dispatch(editCriterion(form, id)),
    clearCriterion: () => dispatch(clearCriterion()),
    fetchCriterion: (id: number) => dispatch(fetchCriterion(id)),
  };
};

export const EditCriterionContainer = connect(mapStateToProps, mapDispatchToProps)(EditCriterion);
