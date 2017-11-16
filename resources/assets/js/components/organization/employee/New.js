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
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';

class NewOrganizationEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            organizationId: props.params.idOrganization
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/organizations/employees/create/${this.state.organizationId}`, formData)
            .then(() => {
                hashHistory.push(`organizations/employees/${this.state.organizationId}`);
            })
            .catch((error) => {
                const errors = error.response.data.messages;

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
            <div>
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
                                            <Input type="date" id="date_birthday" name="date_birthday"
                                                   placeholder="Дата рождения" required/>
                                            <FormText color="muted">Введите дату рождения</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата приема на работу</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="date" id="date_employment" name="date_employment"
                                                   placeholder="Дата приема на работу" required/>
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


                <div className="col-lg-8">
                    {errors}

                </div>
            </div>
        );
    }
}


/**
 * Map
 * @param state
 * @returns {{researchesEmployee: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        // organizationEmployees: state.organizations.organizationEmployees
    };
}

export default connect(mapStateToProps)(NewOrganizationEmployee);
