import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, Form, Label, Input} from 'reactstrap';
import {addPestLocation} from '../../../actions/pest/locationActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';

interface IStateProps {
  errors: any;
}

interface IDispatchProps {
  addPestLocation: typeof addPestLocation;
}

interface IProps extends IStateProps, IDispatchProps {}

class NewPestLocation extends React.PureComponent<IProps> {
  handleSubmit = (event: any) => {
    event.preventDefault();
    const {addPestLocation} = this.props;

    addPestLocation(document.querySelector('#pestLocation'));
  };

  render() {
    const {errors} = this.props;
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
        id="pestLocation"
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
    errors: state.pestLocation.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    addPestLocation: (form: HTMLFormElement) => dispatch(addPestLocation(form)),
  };
};

export const NewPestLocationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPestLocation);
