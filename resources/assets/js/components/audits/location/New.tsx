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
      <Col sm="12" lg="8" xl="6">
        {errorsMessage}
        <Card>
          <Form
            className="form-horizontal"
            onSubmit={this.handleSubmit}
            id={`location${unitId}`}
          >
            <CardHeader>Добавить локацию</CardHeader>
            <CardBody className="card-body">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Наименование</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" name="name" required />
                  <Input type="hidden" name="unitId" value={unitId} required />
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
