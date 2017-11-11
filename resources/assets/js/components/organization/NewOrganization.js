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
import PropTypes from 'prop-types';

class NewOrganization extends React.Component {
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

        axios.post('/organizations/create', formData)
            .then(() => {
                this.context.router.push('/organizations');
            })
            .catch((error) => {
                const errors = error.response.data.message;

                this.setState({
                    errors: errors
                });
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
            <div className="animated fadeIn">
                {errors}
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                Добавить организацию
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name"
                                                   placeholder="Наименование" required/>
                                            <FormText color="muted">Введите наименование</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Адрес</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="address" name="address"
                                                   placeholder="Адрес" required/>
                                            <FormText color="muted">Введите aдрес</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Юридическое лицо</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="legal_entity" name="legal_entity"
                                                   placeholder="Юридическое лицо" required/>
                                            <FormText color="muted">Введите юридическое лицо</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">ФИО руководителя</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="head_fio" name="head_fio"
                                                   placeholder="ФИО руководителя" required/>
                                            <FormText color="muted">Введите abj руководителя</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">E-mail руководителя</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="head_email" name="head_email"
                                                   placeholder="E-mail руководителя" required/>
                                            <FormText color="muted">Введите e-mail руководителя</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">E-mail менеджера</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="regional_email" name="regional_email"
                                                   placeholder="E-mail менеджера" required/>
                                            <FormText color="muted">Введите e-mail менеджера</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">E-mail шеф-повара</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="chef_email" name="chef_email"
                                                   placeholder="E-mail шеф-повара" required/>
                                            <FormText color="muted">Введите e-mail шеф-повара</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Телефон</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="phone" name="phone"
                                                   placeholder="Телефон" required/>
                                            <FormText color="muted">Введите телефон</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Сертификация</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="is_certification" id="select" required>
                                                <option value="0">Нет</option>
                                                <option value="1">ISO 22000:2005</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBlock>
                            <CardFooter>
                                <Button type="submit" size="sm" color="success" onClick={this.handleSubmit}>
                                    <i className="fa fa-dot-circle-o"/> Сохранить
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

NewOrganization.propTypes = {
    router: PropTypes.object.isRequired
};

export default NewOrganization;
