import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, Form, Label, Input} from 'reactstrap';
import {addPestPlace} from '../../../actions/pest/placeActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';
import {TPestPlaceType} from '../../../interface/pest/IPestPlace';

interface IStateProps {
  errors: any;
}

interface IDispatchProps {
  addPestPlace: typeof addPestPlace;
}

interface IProps extends IStateProps, IDispatchProps {
  locationId: number;
}

class NewPestPlace extends React.PureComponent<IProps> {
  handleSubmit = (event: any) => {
    event.preventDefault();
    const {addPestPlace} = this.props;

    addPestPlace(document.querySelector('#pestPlace'));
  };

  render() {
    const {locationId, errors} = this.props;
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
        id="pestPlace"
      >
        {errorsMessage}
        <Row>
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
            <Input type="select" name="type">
              <option value="1">Насекомые</option>
              <option value="2">Летучие</option>
              <option value="3">Грызуны</option>
            </Input>
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
    errors: state.pestPlace.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    addPestPlace: (form: HTMLFormElement) => dispatch(addPestPlace(form)),
  };
};

export const NewPestPlaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPestPlace);
