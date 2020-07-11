import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, Form, Label, Input} from 'reactstrap';
import {addUnit} from '../../../actions/audit/unitActions';
import {createMarkup} from '../../../utils/errorsHelper';

class NewUnit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(addUnit(document.querySelector('#unit')));
  }

  render() {
    const {errors} = this.props;
    let errorsMessage = '';

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
          <Col xs="6">
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

const mapStateToProps = (state) => {
  return {
    errors: state.units.errors,
  };
};

export const NewUnitContainer = connect(mapStateToProps)(NewUnit);
