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
import {addCriterionList} from '../../../actions/audit/criterionListActions';
import {fetchUnits} from '../../../actions/audit/unitActions';
import {fetchLocations} from '../../../actions/audit/locationActions';
import {fetchPlaces} from '../../../actions/audit/placeActions';
import {fetchGroupCriterionLists} from '../../../actions/audit/groupCriterionListActions';
import {createMarkup} from '../../../utils/errorsHelper';

class NewCriterionList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchUnits());
    this.props.dispatch(fetchLocations());
    this.props.dispatch(fetchPlaces());
    this.props.dispatch(fetchGroupCriterionLists());
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      addCriterionList(document.querySelector('#criterionList')),
    );
  }

  render() {
    const {units, locations, places, groupCriterionLists, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="8" lg="6" xl="6">
            {errorsMessage}
            <Card>
              <Form
                className="form-horizontal"
                onSubmit={this.handleSubmit}
                id="criterionList"
              >
                <CardHeader>Добавить чек лист</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Подразделение</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="unit_id" id="unit">
                        {units.map((unit) => {
                          return (
                            <option key={unit.id} value={unit.id}>
                              {unit.name}
                            </option>
                          );
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Локация</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="location_id" id="location">
                        {locations.map((location) => {
                          return (
                            <option key={location.id} value={location.id}>
                              {location.name}
                            </option>
                          );
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Помещение</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="place_id" id="place">
                        {places.map((place) => {
                          return (
                            <option key={place.id} value={place.id}>
                              {place.name}
                            </option>
                          );
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Выбрать чек-лист</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="group_criterion_id" id="group_criterion_id">
                        {groupCriterionLists.map((groupCriterionList) => {
                          return (
                            <option key={groupCriterionList.id} value={groupCriterionList.id}>
                              {groupCriterionList.name}
                            </option>
                          );
                        })}
                      </Input>
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

const mapStateToProps = (state) => {
  return {
    errors: state.criterionLists.errors,
    units: state.units.units,
    locations: state.locations.locations,
    places: state.places.places,
    groupCriterionLists: state.groupCriterionLists.groupCriterionLists,
  };
};

export const NewCriterionListContainer = connect(mapStateToProps)(
  NewCriterionList,
);
