import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {fetchHospital} from '../../../actions/lmk/hospitalActions';
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
  FormText,
  Label,
  Input,
} from 'reactstrap';
import {editHospital} from '../../../actions/lmk/hospitalActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IHospital} from '../../../interface/lmk/IHospital';
import {TState} from '../../../reducers';

interface IProps {
  dispatch: any;
  match: any;
  errors: any;
  hospital: IHospital;
}

interface IState {
  hospitalId: number;
}

class EditHospital extends PureComponent<IProps, IState> {
  state: IState = {
    hospitalId: null,
  };

  componentDidMount() {
    const {match} = this.props;
    const hospitalId = match.params.id;

    this.setState({hospitalId});
    console.log('test', hospitalId);
    this.props.dispatch(fetchHospital(hospitalId));
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.dispatch(
      editHospital(document.querySelector('form'), this.state.hospitalId),
    );
  };

  render() {
    const {hospital, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
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
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={hospital.name}
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Адрес</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="address"
                        name="address"
                        defaultValue={hospital.address}
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ФИО куратора</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="head_fio"
                        name="head_fio"
                        defaultValue={hospital.head_fio}
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Телефон куратора</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="head_phone"
                        defaultValue={hospital.head_phone}
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Расписание</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="shedule"
                        name="shedule"
                        defaultValue={hospital.shedule}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Телефон</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="phone"
                        name="phone"
                        defaultValue={hospital.phone}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="email"
                        defaultValue={hospital.email}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ОГРН</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="ogrn"
                        defaultValue={hospital.ogrn}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Фото карты</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="photo_map" name="photo_map" />
                      <FormText color="muted">Загрузите фото карты</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Текущая карта</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {hospital.photo_map ? (
                        <img
                          src={`/storage/${hospital.photo_map}`}
                          style={{width: '300px', height: '300px'}}
                        />
                      ) : (
                        'Загрузите фото карты'
                      )}
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
    errors: state.hospitals.error,
    hospital: state.hospitals.hospital,
  };
};

export const EditHospitalContainer = connect(mapStateToProps)(EditHospital);
