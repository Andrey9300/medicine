import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, Form, Label, Input} from 'reactstrap';
import {addPlace} from '../../../actions/audit/placeActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';
import {IGroupCriterion} from '../../../interface/audit/IGroupCriterion';

interface IStateProps {
  errors: any;
  groupCriterionLists: IGroupCriterion[];
}

interface IDispatchProps {
  addPlace: typeof addPlace;
}

interface IProps extends IStateProps, IDispatchProps {
  locationId: number;
}

class NewPlace extends React.PureComponent<IProps> {
  handleSubmit = (event: any) => {
    event.preventDefault();
    const {locationId, addPlace} = this.props;

    addPlace(document.querySelector(`#place${locationId}`));
  };

  render() {
    const {errors, locationId, groupCriterionLists} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <Form
        className="form-horizontal"
        onSubmit={this.handleSubmit}
        id={`place${locationId}`}
      >
        {errorsMessage}
        <Row>
          <Col xs="2">
            <Label>Добавить помещение</Label>
          </Col>
          <Col xs="4">
            <Input
              type="text"
              name="name"
              placeholder="Наименование"
              required
            />
            <Input
              type="hidden"
              name="locationId"
              value={locationId}
              required
            />
          </Col>
          <Col xs="4">
            {groupCriterionLists.length > 0 && (
              <select
                className="custom-select"
                name="group_criterion_id"
                required
              >
                <option value="">Выберите чек лист</option>
                {groupCriterionLists.map((groupCriterionList, index) => (
                  <option key={index} value={groupCriterionList.id}>
                    {groupCriterionList.name}
                  </option>
                ))}
              </select>
            )}
          </Col>
          <Col xs="2">
            <Button type="submit" size="sm" color="success">
              <i className="fa fa-dot-circle-o" /> Сохранить
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    errors: state.places.errors,
    groupCriterionLists: state.groupCriterionLists.groupCriterionLists,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    addPlace: (form: HTMLFormElement) => dispatch(addPlace(form)),
  };
};

export const NewPlaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPlace);
