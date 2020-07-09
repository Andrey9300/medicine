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
import {addPlace} from '../../../actions/audit/placeActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';

interface IStateProps {
  errors: any;
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
    const {addPlace} = this.props;

    addPlace(document.querySelector('#place'));
  };

  render() {
    const {errors, locationId} = this.props;
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
            id="place"
          >
            <CardHeader>Добавить помещение</CardHeader>
            <CardBody className="card-body">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Наименование</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="name" name="name" required />
                  <Input type="hidden" name="locationId" value={locationId} required />
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
    errors: state.places.errors,
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
