import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearGroupCriterion, fetchGroupCriterion} from '../../../actions/audit/groupCriterionActions';
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
import {editGroupCriterion} from '../../../actions/audit/groupCriterionActions';
import {createMarkup} from '../../../utils/errorsHelper';

class EditGroupCriterion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      groupCriterionId: props.match.params.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      editGroupCriterion(
        document.querySelector('form'),
        this.state.groupCriterionId,
      ),
    );
  }

  componentDidMount() {
    this.props.dispatch(clearGroupCriterion());
    this.props.dispatch(fetchGroupCriterion(this.state.groupCriterionId));
  }

  render() {
    const {groupCriterion, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!groupCriterion) {
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
                        defaultValue={groupCriterion.name}
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

EditGroupCriterion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  errors: PropTypes.array,
  groupCriterion: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    errors: state.groupCriterions.errors,
    groupCriterion: state.groupCriterions.groupCriterion,
  };
};

export const EditGroupCriterionContainer = connect(mapStateToProps)(EditGroupCriterion);
