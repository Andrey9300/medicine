import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchEmployee} from './../../actions/employeeActions';
import {fetchOrganizations} from './../../actions/organizationActions';
import PropTypes from 'prop-types';
import {hashHistory} from 'react-router';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input
} from 'reactstrap';

class EditEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            employeeId: props.params.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');

        axios.post(`/employees/update/${this.state.employeeId}`, new FormData(formElement))
            .then(() => {
                hashHistory.push(`/employees/${this.state.employeeId}`);
            })
            .catch((errors) => {
                this.setState({
                    errors: errors.response.data.errors
                });
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchEmployee(this.state.employeeId));
        this.props.dispatch(fetchOrganizations());
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

    componentWillReceiveProps(nextProps) {
        if (this.props.employee && nextProps.employee && nextProps.employee.fio !== this.props.employee.fio) {
            window.location.reload();
        }
    }

    render() {
        const {employee} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (employee !== null) {
            formElements =
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <CardHeader>
                                    Редактировать сотрудника
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">ФИО</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="fio" name="fio"
                                                   placeholder="ФИО" defaultValue={employee.fio}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата рождения</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="date_birthday" name="date_birthday"
                                                   placeholder="Y-m-d"
                                                   defaultValue={employee.date_birthday}/>
                                            <FormText color="muted">Введите дату рождения</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата приема на работу</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="date_employment" name="date_employment"
                                                   placeholder="Y-m-d"
                                                   defaultValue={employee.date_employment}/>
                                            <FormText color="muted">Введите дату приема на работу</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Номер медицинской книжки</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="medical_book" name="medical_book"
                                                   placeholder="Номер медицинской книжки"
                                                   defaultValue={employee.medical_book}/>
                                            <FormText color="muted">Введите номер медицинской книжки</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Название организации</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="organization_name" id="organization_name"
                                                   defaultValue={employee.organization.name}>
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
                </Row>;
        }

        return (
            <div>
                {errors}
                {formElements}
            </div>
        );
    }
}

EditEmployee.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        employee: state.employees.employee,
        organizations: state.organizations.organizations
    };
};

export default connect(mapStateToProps)(EditEmployee);
