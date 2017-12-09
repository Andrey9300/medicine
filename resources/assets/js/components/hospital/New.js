import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchRegions} from './../../actions/regionActions';
import {hashHistory} from 'react-router';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input
} from 'reactstrap';

class NewHospital extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchRegions());
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');

        axios.post('/hospitals/store', new FormData(formElement))
            .then(() => {
                hashHistory.push('hospitals');
            })
            .catch((error) => {
                let {errors} = error.response.data;

                if (error.response.status === 403) {
                    const forbidden = [];
                    const access = [];

                    access.push('У вас нет прав');
                    forbidden.access = access;
                    errors = forbidden;
                }

                this.setState({
                    errors: errors
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
            <div className="animated fadeIn">
                {errors}
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <CardHeader>
                                    Добавить медицинскую организацию
                                </CardHeader>
                                <CardBlock className="card-body">
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
                                            <Label htmlFor="text-input">Регион</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="region_id" id="region">
                                                { this.props.regions.map((region) => {
                                                    return (
                                                        <option key={region.id} value={region.id}>
                                                            {region.name}
                                                        </option>
                                                    );
                                                })
                                                }
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Фактический адрес</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="address" name="address"
                                                   placeholder="Фактический адрес" required/>
                                            <FormText color="muted">Введите адрес</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Контактное лицо</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="head_fio" name="head_fio"
                                                   placeholder="Контактное лицо" required/>
                                            <FormText color="muted">Введите контактное лицо</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Расписание</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="shedule" name="shedule"
                                                   placeholder="Расписание"/>
                                            <FormText color="muted">Введите расписание</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Фото карты</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="photo_map" name="photo_map"
                                                   placeholder="Фото карты"/>
                                            <FormText color="muted">Добавьте фото карты</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Телефон</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="phone" name="phone"
                                                   placeholder="Телефон"/>
                                            <FormText color="muted">Введите телефон</FormText>
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

const mapStateToProps = (state) => {
    return {
        regions: state.regions.regions
    };
};

export default connect(mapStateToProps)(NewHospital);
