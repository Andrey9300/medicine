import React from 'react';
import {connect} from 'react-redux';
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
import {
  clearPestPlace,
  fetchPestPlace,
  editPestPlace,
} from '../../../actions/pest/placeActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IPestPlace} from '../../../interface/pest/IPestPlace';
import {TState} from '../../../reducers';

interface IStateProps {
  pestPlace: IPestPlace;
  errors: any;
}

interface IDispatchProps {
  clearPestPlace: typeof clearPestPlace;
  fetchPestPlace: typeof fetchPestPlace;
  editPestPlace: typeof editPestPlace;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  pestPlaceId: number;
}

class EditPestPlace extends React.PureComponent<IProps, IState> {
  public state: IState = {
    pestPlaceId: null,
  };

  componentDidMount() {
    const {match, clearPestPlace, fetchPestPlace} = this.props;

    clearPestPlace();
    fetchPestPlace(match.params.id);

    this.setState({pestPlaceId: match.params.id});
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {pestPlaceId} = this.state;
    const {editPestPlace} = this.props;

    editPestPlace(document.querySelector('form'), pestPlaceId);
  };

  render() {
    const {pestPlace, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!pestPlace) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать точку контроля</CardHeader>
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
                        defaultValue={pestPlace.name}
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
    errors: state.pestPlace.errors,
    pestPlace: state.pestPlace.pestPlace,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearPestPlace: () => dispatch(clearPestPlace()),
    fetchPestPlace: (id: number) => dispatch(fetchPestPlace(id)),
    editPestPlace: (form: HTMLFormElement, id: number) =>
      dispatch(editPestPlace(form, id)),
  };
};

export const EditPestPlaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPestPlace);
