import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearUnit, fetchUnit} from './../../actions/unitActions';
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
import {editUnit} from '../../actions/unitActions';
import {createMarkup} from '../../utils/errorsHelper';

class EditUnit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      unitId: props.match.params.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      editUnit(
        document.querySelector('form'),
        this.state.unitId,
      ),
    );
  }

  componentDidMount() {
    this.props.dispatch(clearUnit());
    this.props.dispatch(fetchUnit(this.state.unitId));
  }

  render() {
    const {unit, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!unit) {
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
                        defaultValue={unit.name}
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

EditUnit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  errors: PropTypes.array,
  unit: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    errors: state.units.errors,
    unit: state.units.unit,
  };
};

export default connect(mapStateToProps)(EditUnit);
