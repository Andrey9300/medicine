import React from 'react';
import {connect} from 'react-redux';
import {
  Row,
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
import {addLocation} from '../../../actions/audit/locationActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';

interface IStateProps {
  errors: any;
}
interface IDispatchProps {
  addLocation: typeof addLocation;
}

interface IProps extends IStateProps, IDispatchProps {
  unitId: number;
}

class NewLocation extends React.PureComponent<IProps> {
  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {unitId, addLocation} = this.props;

    addLocation(document.querySelector(`#location${unitId}`));
  };

  render() {
    const {errors, unitId} = this.props;
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
        id={`location${unitId}`}
      >
        {errorsMessage}
        <Row>
          <Col xs="2">
            <Label>Добавить локацию</Label>
          </Col>
          <Col xs="8">
            <Input type="text" name="name" placeholder="Наименование" required />
            <Input type="hidden" name="unitId" value={unitId} required />
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
    errors: state.locations.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    addLocation: (form: HTMLFormElement) => dispatch(addLocation(form)),
  };
};

export const NewLocationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewLocation);
