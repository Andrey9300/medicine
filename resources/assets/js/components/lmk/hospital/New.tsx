import React, {PureComponent} from 'react';
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
  FormText,
} from 'reactstrap';
import {addHospital} from '../../../actions/lmk/hospitalActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IHospital} from '../../../interface/lmk/IHospital';
import {TState} from "../../../reducers";

interface IProps {
  dispatch: any;
  match: any;
  errors: any;
  hospital: IHospital;
}

class NewHospital extends PureComponent<IProps> {
  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.dispatch(addHospital(document.querySelector('form')));
  };

  render() {
    const {errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Добавить медицинскую организацию</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="name" name="name" required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Фактический адрес</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="address" name="address" required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ФИО куратора</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="head_fio" required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Телефон куратора</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="head_phone" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Расписание</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="shedule" name="shedule" />
                    </Col>
                  </FormGroup>
                  {/* <FormGroup row>*/}
                  {/* <Col md="3">*/}
                  {/* <Label htmlFor="text-input">Фото карты</Label>*/}
                  {/* </Col>*/}
                  {/* <Col xs="12" md="9">*/}
                  {/* <Input type="text" id="photo_map" name="photo_map"*/}
                  {/* </Col>*/}
                  {/* </FormGroup>*/}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Телефон</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="phone" name="phone" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="email" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ОГРН</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="ogrn" />
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
  return {};
};

export const NewHospitalContainer = connect(mapStateToProps)(NewHospital);
