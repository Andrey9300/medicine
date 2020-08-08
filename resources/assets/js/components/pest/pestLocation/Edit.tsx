import React from 'react';
import {connect} from 'react-redux';
import {
  clearPestLocation,
  fetchPestLocation,
} from '../../../actions/pest/locationActions';
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
import {editPestLocation} from '../../../actions/pest/locationActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IPestLocation} from '../../../interface/pest/IPestLocation';
import {TState} from '../../../reducers';

interface IStateProps {
  pestLocation: IPestLocation;
  errors: any;
}

interface IDispatchProps {
  clearPestLocation: typeof clearPestLocation;
  fetchPestLocation: typeof fetchPestLocation;
  editPestLocation: typeof editPestLocation;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  pestLocationId: number;
}

class EditPestLocation extends React.PureComponent<IProps, IState> {
  public state: IState = {
    pestLocationId: null,
  };

  componentDidMount() {
    const {match, clearPestLocation, fetchPestLocation} = this.props;

    clearPestLocation();
    fetchPestLocation(match.params.id);

    this.setState({pestLocationId: match.params.id});
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {pestLocationId} = this.state;
    const {editPestLocation} = this.props;

    editPestLocation(document.querySelector('form'), pestLocationId);
  };

  render() {
    const {pestLocation, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!pestLocation) {
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
                        defaultValue={pestLocation.name}
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
    errors: state.pestLocation.errors,
    pestLocation: state.pestLocation.pestLocation,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearPestLocation: () => dispatch(clearPestLocation()),
    fetchPestLocation: (id: number) => dispatch(fetchPestLocation(id)),
    editPestLocation: (form: HTMLFormElement, id: number) =>
      dispatch(editPestLocation(form, id)),
  };
};

export const EditPestLocationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPestLocation);
