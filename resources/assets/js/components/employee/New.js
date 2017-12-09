import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {fetchOrganizations} from './../../actions/organizationActions';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input
} from 'reactstrap';

class NewEmployee extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganizations());
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');

        axios.post('/employees/store', new FormData(formElement))
            .then(() => {
                hashHistory.push('/employees');
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    createMarkup() {
        let html = '';

        Object.keys(this.state.errors).forEach((item) => {
            this.state.errors[item].forEach((value) => {
                html += `<p>${value}</p>`;
            });
        });

        return {
            __html: html
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
                {errors}
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <CardHeader>
                                    Добавить сотрудника
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">ФИО</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="fio"
                                                   placeholder="ФИО" required/>
                                            <FormText color="muted">Введите ФИО</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата рождения</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="date_birthday" name="date_birthday"
                                                   placeholder="Y-m-d"
                                                   required/>
                                            <FormText color="muted">Введите дату рождения</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата приема на работу</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="date_employment" name="date_employment"
                                                   placeholder="Y-m-d" required/>
                                            <FormText color="muted">Введите дату приема на работу</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Номер медицинской книжки</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="medical_book" name="medical_book"
                                                   placeholder="Номер медицинской книжки"/>
                                            <FormText color="muted">Введите номер медицинской книжки</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Название организации</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="organization_name" id="organization_name">
                                                { this.props.organizations.map((organization) => {
                                                    return (
                                                        <option key={organization.id} value={organization.name}>
                                                            {organization.name}
                                                        </option>
                                                    );
                                                })
                                                }
                                            </Input>
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

NewEmployee.propTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        organizations: state.organizations.organizations
    };
};

export default connect(mapStateToProps)(NewEmployee);
