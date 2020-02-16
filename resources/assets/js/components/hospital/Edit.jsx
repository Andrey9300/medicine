import React from 'react';
import {connect} from 'react-redux';
import {fetchHospital} from './../../actions/hospitalActions';
import PropTypes from 'prop-types';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input} from 'reactstrap';
import {editHospital} from '../../actions/hospitalActions';

class EditHospital extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hospitalId: props.match.params.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(editHospital(
      document.querySelector('form'),
      this.state.hospitalId
    ));
  }

  componentWillMount() {
    this.props.dispatch(fetchHospital(this.state.hospitalId));
  }

  createMarkup() {
    const {errors} = this.props;

    return Object.keys(errors).map((item) => {
      return errors[item].map((value, index) => {
        return <p key={index}>{value}</p>;
      });
    });
  }

  render() {
    const {hospital, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = <div className="alert alert-danger" role="alert">this.createMarkup()}</div>;
    }

    if (!hospital) {
      return null;
    }

    return (
      <div>
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать медицинское учреждение</CardHeader>
                <CardBlock className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="name" name="name"
                        defaultValue={hospital.name} required/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Адрес</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="address" name="address"
                        defaultValue={hospital.address} required/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Контактное лицо</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="head_fio" name="head_fio"
                        defaultValue={hospital.head_fio} required/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Расписание</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="shedule" name="shedule"
                        defaultValue={hospital.shedule}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Фото карты</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="photo_map" name="photo_map"
                        defaultValue={hospital.photo_map}/>
                      <FormText color="muted">Загрузите фото карты</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Телефон</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="phone" name="phone"
                        defaultValue={hospital.phone}/>
                    </Col>
                  </FormGroup>
                </CardBlock>
                <CardFooter>
                  <Button type="submit" size="sm" color="success">
                    <i className="fa fa-dot-circle-o"/> Сохранить
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

EditHospital.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    errors: state.hospitals.errors,
    hospital: state.hospitals.hospital
  };
};

export default connect(mapStateToProps)(EditHospital);
