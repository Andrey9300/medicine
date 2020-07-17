import React from 'react';
import {connect} from 'react-redux';
import {
  clearGroupCriterionList,
  fetchGroupCriterionList,
} from '../../../actions/audit/groupCriterionListActions';
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
import {TState} from '../../../reducers';
import {IGroupCriterion} from '../../../interface/audit/IGroupCriterion';

interface IStateProps {
  groupCriterionList: IGroupCriterion;
  errors: any;
}

interface IDispatchProps {
  clearGroupCriterionList: typeof clearGroupCriterionList;
  fetchGroupCriterionList: typeof fetchGroupCriterionList;
  editGroupCriterionList: typeof editGroupCriterionList;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  groupCriterionListId: number;
}

class EditGroupCriterionList extends React.PureComponent<IProps> {
  public state: IState = {
    groupCriterionListId: null,
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const {editGroupCriterionList} = this.props;

    editGroupCriterionList(
      document.querySelector('form'),
      this.state.groupCriterionListId,
    );
  };

  componentDidMount() {
    const {
      match,
      clearGroupCriterionList,
      fetchGroupCriterionList,
    } = this.props;

    this.setState({groupCriterionListId: match.params.id});
    clearGroupCriterionList();
    fetchGroupCriterionList(match.params.id);
  }

  render() {
    const {groupCriterionList, errors} = this.props;
    let errorsMessage = null;

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
                        type="text"
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

const mapStateToProps = (state: TState) => {
  return {
    errors: state.groupCriterionLists.errors,
    groupCriterionList: state.groupCriterionLists.groupCriterionList,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearGroupCriterionList: () => dispatch(clearGroupCriterionList()),
    fetchGroupCriterionList: (id: number) =>
      dispatch(fetchGroupCriterionList(id)),
    editGroupCriterionList: (form: HTMLFormElement, id: number) =>
      dispatch(editGroupCriterionList(form, id)),
  };
};

export const EditGroupCriterionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditGroupCriterionList);
