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
import {addUnit} from '../../actions/unitActions';
import {createMarkup} from '../../utils/errorsHelper';

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
      <Col xs="12" sm="12" md="8" lg="6" xl="6">
        {errorsMessage}
        <Card>
          <Form
            className="form-horizontal"
            onSubmit={this.handleSubmit}
            id="unit"
          >
            <CardHeader>Добавить подразделение</CardHeader>
            <CardBody className="card-body">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Наименование</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="name" name="name" required />
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.units.errors,
  };
};

export const NewUnitContainer = connect(mapStateToProps)(NewUnit);
