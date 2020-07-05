import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearGroupCriterionList, fetchGroupCriterionList} from '../../../actions/audit/groupCriterionListActions';
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
import {editGroupCriterionList} from '../../../actions/audit/groupCriterionListActions';
import {createMarkup} from '../../../utils/errorsHelper';

class EditGroupCriterionList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      groupCriterionListId: props.match.params.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      editGroupCriterionList(
        document.querySelector('form'),
        this.state.groupCriterionListId,
      ),
    );
  }

  componentDidMount() {
    this.props.dispatch(clearGroupCriterionList());
    this.props.dispatch(fetchGroupCriterionList(this.state.groupCriterionListId));
  }

  render() {
    const {groupCriterionList, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!groupCriterionList) {
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
                        defaultValue={groupCriterionList.name}
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

EditGroupCriterionList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  errors: PropTypes.array,
  groupCriterionList: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    errors: state.groupCriterionLists.errors,
    groupCriterionList: state.groupCriterionLists.groupCriterionList,
  };
};

export const EditGroupCriterionListContainer = connect(mapStateToProps)(EditGroupCriterionList);
