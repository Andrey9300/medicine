import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchLegalEntity} from './../../actions/legalEntityActions';
import PropTypes from 'prop-types';
import {hashHistory} from 'react-router';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input
} from 'reactstrap';

class EditLegalEntity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            legalEntityId: props.params.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');

        axios.post(`/legalEntities/update/${this.state.legalEntityId}`, new FormData(formElement))
            .then(() => {
                hashHistory.push(`/legalEntities/${this.state.legalEntityId}`);
            })
            .catch((errors) => {
                this.setState({
                    errors: errors.response.data.errors
                });
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchLegalEntity(this.state.legalEntityId));
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
        if (this.props.legalEntity && nextProps.legalEntity &&
            nextProps.legalEntity.name !== this.props.legalEntity.name
        ) {
            //window.location.reload();
        }
    }

    render() {
        const {legalEntity} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (legalEntity !== null) {
            formElements =
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <CardHeader>
                                    Редактировать юридическое лицо
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name" placeholder="Наименование"
                                                   defaultValue={legalEntity.name} required/>
                                            <FormText color="muted">Введите наименование</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Адрес</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="address" name="address" placeholder="Адрес"
                                                   defaultValue={legalEntity.address} required/>
                                            <FormText color="muted">Введите aдрес</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Телефон</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="phone" name="phone"
                                                   defaultValue={legalEntity.phone} required/>
                                            <FormText color="muted">Введите телефон</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">ИНН</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="inn" name="inn"
                                                   defaultValue={legalEntity.inn}/>
                                            <FormText color="muted">Введите ИНН</FormText>
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

EditLegalEntity.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        legalEntity: state.legalEntities.legalEntity
    };
};

export default connect(mapStateToProps)(EditLegalEntity);
