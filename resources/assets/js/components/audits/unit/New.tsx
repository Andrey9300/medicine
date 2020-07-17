import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, Form, Label, Input} from 'reactstrap';
import {addUnit} from '../../../actions/audit/unitActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';

interface IStateProps {
  errors: any;
}

interface IDispatchProps {
  addUnit: typeof addUnit;
}

interface IProps extends IStateProps, IDispatchProps {}

class NewUnit extends React.PureComponent<IProps> {
  handleSubmit = (event: any) => {
    event.preventDefault();
    const {addUnit} = this.props;

    addUnit(document.querySelector('#unit'));
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
      <Form className="form-horizontal" onSubmit={this.handleSubmit} id="unit">
        {errorsMessage}
        <Row>
          <Col xs="2">
            <Label>Добавить подразделение</Label>
          </Col>
          <Col xs="8">
            <Input placeholder="Наименование" name="name" />
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
    errors: state.units.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    addUnit: (form: HTMLFormElement) => dispatch(addUnit(form)),
  };
};

export const NewUnitContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewUnit);
