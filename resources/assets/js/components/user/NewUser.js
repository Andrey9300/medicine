import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';
import {
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardFooter,
    CardBlock,
    Form,
    FormGroup,
    FormText,
    Label,
    Input
} from 'reactstrap';

class NewUser extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            errors: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post('/users/create', formData)
            .then(() => {
                this.context.router.push('/users');
                NotificationManager.success('User has been created!', 'Success', 5000);
            })
            .catch((error) => {
                    const errors = error.response.data.messages;

                this.setState({
                    errors: errors
                });
                NotificationManager.error('Error occured during operation!', 'Error', 5000);
            });
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        let errors = '';

        if (this.state.errors) {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        return (
            <div>
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                Добавить сотрудника
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">ФИО</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="fio" placeholder="ФИО" required/>
                                            <FormText color="muted">Введите ФИО</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата рождения</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="date_birthday" name="date_birthday" placeholder="Дата рождения" required/>
                                            <FormText color="muted">Введите дату рождения</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата приема на работу</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="date_employment" name="date_employment" placeholder="Дата приема на работу" required/>
                                            <FormText color="muted">Введите дату приема на работу</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Номер медицинской книжки</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="medical_book" name="medical_book" placeholder="Номер медицинской книжки"/>
                                            <FormText color="muted">Введите номер медицинской книжки</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Должность</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="role" name="role" placeholder="Должность" required/>
                                            <FormText color="muted">Введите должность</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Название организации</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="organization_name" name="organization_name" placeholder="Название организации" required/>
                                            <FormText color="muted">Введите название организации</FormText>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBlock>
                            <CardFooter>
                                <Button type="submit" size="sm" color="success" onClick={this.handleSubmit}>
                                    <i className="fa fa-dot-circle-o"></i> Сохранить
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>


                <div className="col-lg-8">
                    {errors}

                </div>
            </div>
        );
    }
}
export default NewUser;
