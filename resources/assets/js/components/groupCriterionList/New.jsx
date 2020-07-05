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
import {addGroupCriterionList} from '../../actions/audit/groupCriterionListActions';
import {fetchCriterions} from '../../actions/audit/criterionActions';
import {fetchGroupCriterions} from '../../actions/audit/groupCriterionActions';
import {createMarkup} from '../../utils/errorsHelper';

class NewGroupCriterionList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCriterions());
    this.props.dispatch(fetchGroupCriterions());
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      addGroupCriterionList(document.querySelector('#groupCriterionList')),
    );
  }

  render() {
    const {errors, groupCriterions, criterions} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <Col xs="12" sm="12" md="12" lg="6" xl="6">
        <Card>
          {errorsMessage}
          <Form
            className="form-horizontal"
            onSubmit={this.handleSubmit}
            id="groupCriterionList"
          >
            <CardHeader>Добавить группу чек листов</CardHeader>
            <CardBody className="card-body">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Группа</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="select"
                    name="group_criterion_id"
                    id="groupCriterions"
                  >
                    {groupCriterions.map((groupCriterion) => {
                      return (
                        <option
                          key={groupCriterion.id}
                          value={groupCriterion.id}
                        >
                          {groupCriterion.name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </FormGroup>
              {criterions.map((criterion, index) => {
                return (
                  <FormGroup row key={index}>
                    <Col md="9" lg="9">
                      <Label htmlFor="text-input">{criterion.name}</Label>
                    </Col>
                    <Col md="3" lg="3">
                      <Input
                        type="checkbox"
                        name={`criterions[${criterion.id}]`}
                        value={criterion.id}
                      />
                    </Col>
                  </FormGroup>
                );
              })}
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

const mapStateToProps = (state) => {
  return {
    errors: state.groupCriterionLists.errors,
    groupCriterions: state.groupCriterions.groupCriterions,
    criterions: state.criterions.criterions,
  };
};

export const NewGroupCriterionListContainer = connect(mapStateToProps)(
  NewGroupCriterionList,
);
