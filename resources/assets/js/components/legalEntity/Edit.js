import React from 'react';
import {connect} from 'react-redux';
import {fetchLegalEntity} from './../../actions/legalEntityActions';
import PropTypes from 'prop-types';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input
} from 'reactstrap';
import {editLegalEntity} from '../../actions/legalEntityActions';

class EditLegalEntity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            legalEntityId: props.params.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(editLegalEntity(document.querySelector('form'), this.state.legalEntityId));
    }

    componentWillMount() {
        this.props.dispatch(fetchLegalEntity(this.state.legalEntityId));
    }

    createMarkup() {
        let html = '';

        Object.keys(this.props.errors).forEach((item) => {
            this.props.errors[item].forEach((value) => {
                html += `<p>${value}</p>`;
            });
        });

        return {
            __html: html
        };
    }

    render() {
        const {legalEntity, errors} = this.props;
        let errorsMessage = '';

        if (errors) {
            errorsMessage = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (legalEntity === null) {
            return null;
        }

        return (
            <div>
                {errorsMessage}
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
                </Row>
            </div>
        );
    }
}

EditLegalEntity.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        errors: state.legalEntities.errors,
        legalEntity: state.legalEntities.legalEntity
    };
};

export default connect(mapStateToProps)(EditLegalEntity);
