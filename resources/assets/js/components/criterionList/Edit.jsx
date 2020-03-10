import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearCriterionList, fetchCriterionList} from './../../actions/criterionListActions';
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
import {editCriterionList} from '../../actions/criterionListActions';
import {createMarkup} from '../../utils/errorsHelper';

class EditCriterionList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      criterionListId: props.match.params.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      editCriterionList(
        document.querySelector('form'),
        this.state.criterionListId,
      ),
    );
  }

  componentDidMount() {
    this.props.dispatch(clearCriterionList());
    this.props.dispatch(fetchCriterionList(this.state.criterionLRistId));
  }

  render() {
    const {criterionList, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!criterionList) {
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
                        defaultValue={criterionList.name}
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

EditCriterionList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  errors: PropTypes.array,
  criterionList: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    errors: state.criterionLists.errors,
    criterionList: state.criterionLists.criterionList,
  };
};

export const EditCriterionListContainer = connect(mapStateToProps)(EditCriterionList);
