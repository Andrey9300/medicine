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
  Collapse,
} from 'reactstrap';
import {addGroupCriterionList} from '../../../actions/audit/groupCriterionListActions';
import {fetchCriterions} from '../../../actions/audit/criterionActions';
import {fetchGroupCriterions} from '../../../actions/audit/groupCriterionActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';
import {ICriterion} from '../../../interface/audit/ICriterion';
import {ExpandComponent} from '../objects/HeaderObject';

interface IStateProps {
  errors: any;
  criterions: ICriterion[];
}

interface IDispatchProps {
  fetchCriterions: typeof fetchCriterions;
  addGroupCriterionList: typeof addGroupCriterionList;
}

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
  collapse: boolean;
}

class NewGroupCriterionList extends React.PureComponent<IProps> {
  public state: IState = {
    collapse: false,
  };

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  componentDidMount() {
    const {fetchCriterions} = this.props;

    fetchCriterions();
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {addGroupCriterionList} = this.props;

    addGroupCriterionList(document.querySelector('#groupCriterionList'));
  };

  render() {
    const {collapse} = this.state;
    const {errors, criterions} = this.props;
    let errorsMessage = null;

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
                <Col md="4">
                  <Label htmlFor="text-input">Название группы</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input type="text" name="group_criterion_name" required />
                </Col>
              </FormGroup>
              {criterions?.length > 0 ? (
                <div style={{fontWeight: 600, marginBottom: '20px'}}>
                  Критерии{' '}
                  <ExpandComponent collapse={collapse} toggle={this.toggle} />
                </div>
              ) : (
                <div style={{color: 'red'}}>Добавьте критерий ниже</div>
              )}
              <Collapse isOpen={collapse}>
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
              </Collapse>
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
    errors: state.groupCriterionLists.errors,
    criterions: state.criterions.criterions,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchCriterions: () => dispatch(fetchCriterions()),
    addGroupCriterionList: (form: HTMLFormElement) =>
      dispatch(addGroupCriterionList(form)),
  };
};

export const NewGroupCriterionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewGroupCriterionList);
