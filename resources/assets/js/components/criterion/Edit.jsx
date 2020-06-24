import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearCriterion, fetchCriterion} from '../../actions/criterionActions';
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
import {editCriterion} from '../../actions/criterionActions';
import {createMarkup} from '../../utils/errorsHelper';

class EditCriterion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      criterionId: props.match.params.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      editCriterion(
        document.querySelector('form'),
        this.state.criterionId,
      ),
    );
  }

  componentDidMount() {
    this.props.dispatch(clearCriterion());
    this.props.dispatch(fetchCriterion(this.state.criterionId));
  }

  render() {
    const {criterion, errors} = this.props;
    let errorsMessage = '';

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
                        type="input"
                        name="name"
                        id="name"
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

EditCriterion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  errors: PropTypes.array,
  criterion: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    errors: state.criterions.errors,
    criterion: state.criterions.criterion,
  };
};

export default connect(mapStateToProps)(EditCriterion);
