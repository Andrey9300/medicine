import React from 'react';
import {connect} from 'react-redux';
import {
  clearLocation,
  fetchLocation,
} from '../../../actions/audit/locationActions';
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
import {editLocation} from '../../../actions/audit/locationActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';
import {ILocation} from '../../../interface/audit/ILocation';

interface IStateProps {
  location: ILocation;
  errors: any;
}

interface IDispatchProps {
  clearLocation: typeof clearLocation;
  editLocation: typeof editLocation;
  fetchLocation: typeof fetchLocation;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  locationId: number;
}

class EditLocation extends React.PureComponent<IProps> {
  public state: IState = {
    locationId: null,
  };

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {editLocation} = this.props;

    editLocation(document.querySelector('form'), this.state.locationId);
  };

  componentDidMount() {
    const {match, clearLocation, fetchLocation} = this.props;

    this.setState({locationId: match.params.id});
    clearLocation();
    fetchLocation(match.params.id);
  }

  render() {
    const {location, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!location) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать локацию</CardHeader>
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
                        defaultValue={location.name}
                      />
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
    errors: state.locations.errors,
    location: state.locations.location,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    editLocation: (form: HTMLFormElement, id: number) =>
      dispatch(editLocation(form, id)),
    fetchLocation: (id: number) => dispatch(fetchLocation(id)),
    clearLocation: () => dispatch(clearLocation()),
  };
};

export const EditLocationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLocation);
