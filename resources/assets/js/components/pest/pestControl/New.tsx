import React from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Button,
  Form,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Input,
  Collapse,
} from 'reactstrap';
import {fetchPestPlacesForLocation} from '../../../actions/pest/placeActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';
import {IPestPlace} from '../../../interface/pest/IPestPlace';
import {addPestControl} from '../../../actions/pest/controlActions';
import {ExpandComponent} from '../../audits/objects/HeaderObject';
import {CriteriaList} from './CriteriaList';

interface IStateProps {
  pestPlaces: IPestPlace[];
  errors: any;
}

interface IDispatchProps {
  addPestControl: typeof addPestControl;
  fetchPestPlacesForLocation: typeof fetchPestPlacesForLocation;
}

interface IProps extends IStateProps, IDispatchProps {
  locationId: number;
}

interface IState {
  collapse: boolean;
}

class NewPestControl extends React.PureComponent<IProps> {
  public state: IState = {
    collapse: true,
  };

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  componentDidMount() {
    const {fetchPestPlacesForLocation, locationId} = this.props;

    fetchPestPlacesForLocation(locationId);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    const {addPestControl} = this.props;

    addPestControl(document.querySelector('#pestControl'));
  };

  render() {
    const {collapse} = this.state;
    const {locationId, pestPlaces, errors} = this.props;
    let errorsMessage = null;

    if (!pestPlaces || pestPlaces.length === 0) {
      return null;
    }

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
        id="pestControl"
      >
        {errorsMessage}
        <Card>
          <CardHeader>
            <i className="fa fa-plus" aria-hidden="true" />
            Провести контроль локации
            <ExpandComponent collapse={collapse} toggle={this.toggle} />
          </CardHeader>
          <Collapse isOpen={collapse}>
            <CardBody className="card-body">
              <Row
                style={{
                  borderBottom: '1px solid #c2cfd6',
                  marginBottom: '8px',
                  paddingBottom: '8px',
                }}
              >
                <Col xs="2" className="text-center">
                  Точка контроля
                </Col>
                <Col xs="3" className="text-center">
                  Состояние точки контроля
                </Col>
                <Col xs="4" className="text-center">
                  Учет численности насекомых
                </Col>
                <Col xs="3" className="text-center">
                  Замена ловушки
                </Col>
              </Row>
              <Input
                type="hidden"
                name="locationId"
                value={locationId}
                required
              />
              {pestPlaces.map((pestPlace, index) => (
                <CriteriaList pestPlace={pestPlace} index={index} />
              ))}
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="success">
                <i className="fa fa-dot-circle-o" /> Сохранить
              </Button>
            </CardFooter>
          </Collapse>
        </Card>
      </Form>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    pestPlaces: state.pestPlace.pestPlaces,
    errors: state.pestControl.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    addPestControl: (form: HTMLFormElement) => dispatch(addPestControl(form)),
    fetchPestPlacesForLocation: (locationId: number) =>
      dispatch(fetchPestPlacesForLocation(locationId)),
  };
};

export const NewPestControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPestControl);
