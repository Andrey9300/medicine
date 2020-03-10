import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearPlace, fetchPlace} from './../../actions/placeActions';
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
import {editPlace} from '../../actions/placeActions';
import {createMarkup} from '../../utils/errorsHelper';

class EditPlace extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeId: props.match.params.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      editPlace(
        document.querySelector('form'),
        this.state.placeId,
      ),
    );
  }

  componentDidMount() {
    this.props.dispatch(clearPlace());
    this.props.dispatch(fetchPlace(this.state.placeId));
  }

  render() {
    const {place, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!place) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать критерий</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="input"
                        name="name"
                        id="name"
                        defaultValue={place.name}
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

EditPlace.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  errors: PropTypes.array,
  place: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    errors: state.places.errors,
    place: state.places.place,
  };
};

export default connect(mapStateToProps)(EditPlace);
