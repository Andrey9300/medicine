import React from 'react';
import {connect} from 'react-redux';
import {clearPlace, fetchPlace} from '../../../actions/audit/placeActions';
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
import {editPlace} from '../../../actions/audit/placeActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IPlace} from '../../../interface/audit/IPlace';
import {TState} from '../../../reducers';
import {
  clearGroupCriterionList,
  fetchGroupCriterionLists,
} from '../../../actions/audit/groupCriterionListActions';
import {IGroupCriterion} from '../../../interface/audit/IGroupCriterion';
import {
  clearPlaceCheckList,
  fetchPlaceCheckList,
} from '../../../actions/audit/placeCheckListActions';
import {ICriterionList} from '../../../interface/audit/ICriterionList';

interface IStateProps {
  place: IPlace;
  groupCriterionLists: IGroupCriterion[];
  placeCheckList: ICriterionList;
  fetched: boolean;
  errors: any;
}

interface IDispatchProps {
  clearPlace: typeof clearPlace;
  fetchPlace: typeof fetchPlace;
  editPlace: typeof editPlace;
  clearPlaceCheckList: typeof clearPlaceCheckList;
  fetchPlaceCheckList: typeof fetchPlaceCheckList;
  clearGroupCriterionList: typeof clearGroupCriterionList;
  fetchGroupCriterionLists: typeof fetchGroupCriterionLists;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  placeId: number;
}

class EditPlace extends React.PureComponent<IProps, IState> {
  public state: IState = {
    placeId: null,
  };

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {placeId} = this.state;
    const {editPlace} = this.props;

    editPlace(document.querySelector('form'), placeId);
  };

  componentDidMount() {
    const {
      match,
      clearPlace,
      clearPlaceCheckList,
      clearGroupCriterionList,
      fetchPlaceCheckList,
      fetchPlace,
      fetchGroupCriterionLists,
    } = this.props;

    clearPlace();
    clearGroupCriterionList();
    clearPlaceCheckList();
    fetchGroupCriterionLists();
    fetchPlaceCheckList(match.params.id);
    fetchPlace(match.params.id);

    this.setState({placeId: match.params.id});
  }

  render() {
    const {place, groupCriterionLists, placeCheckList, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!place) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать помещение</CardHeader>
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
                        defaultValue={place.name}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Чек лист</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {placeCheckList?.groupCriterion?.name ? (
                        placeCheckList.groupCriterion.name
                      ) : (
                        <select
                          className="custom-select"
                          name="group_criterion_id"
                        >
                          <option value="">Выберите</option>
                          {groupCriterionLists.map((groupCriterionList) => (
                            <option value={groupCriterionList.id}>
                              {groupCriterionList.name}
                            </option>
                          ))}
                        </select>
                      )}
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
    errors: state.places.errors,
    place: state.places.place,
    groupCriterionLists: state.groupCriterionLists.groupCriterionLists,
    placeCheckList: state.placeCheckLists.placeCheckList,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearPlace: () => dispatch(clearPlace()),
    fetchPlace: (id: number) => dispatch(fetchPlace(id)),
    editPlace: (form: HTMLFormElement, id: number) =>
      dispatch(editPlace(form, id)),
    clearPlaceCheckList: () => dispatch(clearPlaceCheckList()),
    fetchPlaceCheckList: (id: number) => dispatch(fetchPlaceCheckList(id)),
    clearGroupCriterionList: () => dispatch(clearGroupCriterionList()),
    fetchGroupCriterionLists: () => dispatch(fetchGroupCriterionLists()),
  };
};

export const EditPlaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPlace);
