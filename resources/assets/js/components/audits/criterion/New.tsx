import React from 'react';
import {connect} from 'react-redux';
import {
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {
  addCriterion,
  deleteCriterion,
  fetchCriterion,
} from '../../../actions/audit/criterionActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {ICriterion} from '../../../interface/audit/ICriterion';
import {TState} from '../../../reducers';

interface IStateProps {
  errors: any;
}

interface IDispatchProps {
  addCriterion: typeof addCriterion;
}

interface IProps extends IStateProps, IDispatchProps {}

class NewCriterion extends React.PureComponent<IProps> {
  handleSubmit = (event: any) => {
    event.preventDefault();
    const {addCriterion} = this.props;

    addCriterion(document.querySelector('#criterion'));
  };

  render() {
    const {errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <Col xs="12" sm="12" md="8" lg="6" xl="6">
        <Card>
          {errorsMessage}
          <Form
            className="form-horizontal"
            onSubmit={this.handleSubmit}
            id="criterion"
          >
            <CardHeader>Добавить критерий</CardHeader>
            <CardBody className="card-body">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Наименование</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="textarea"
                    id="name"
                    name="name"
                    rows="5"
                    cols="33"
                    required
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
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    errors: state.criterions.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    addCriterion: (form: HTMLFormElement) => dispatch(addCriterion(form)),
  };
};

export const NewCriterionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCriterion);
