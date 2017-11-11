import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchOrganization} from './../../actions/organizationActions';
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

class EditOrganization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            organizationId: props.params.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/organizations/update/${this.state.organizationId}`, formData)
            .then(() => {
                this.context.router.push(`/organizations/${this.state.organizationId}`);
            })
            .catch((error) => {
                const errors = error.response.data.data;

                this.setState({
                    errors: errors
                });
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganization(this.state.organizationId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {organization} = this.props.organization;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (organization !== null) {
            formElements =
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                Редактировать организацию
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name"
                                                   placeholder="Наименование"
                                                   defaultValue={organization.name} readOnly/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Адрес</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="address" name="address"
                                                   placeholder="Адрес"
                                                   defaultValue={organization.address} readOnly/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Юридическое лицо</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="legal_entity" name="legal_entity"
                                                   placeholder="Юридическое лицо"
                                                   defaultValue={organization.legal_entity} readOnly/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Сертификация</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                                {(() => {
                                                    switch (organization.is_certification) {
                                                        case 0:
                                                            return (
                                                                <Input type="select" name="is_certification"
                                                                       id="select">
                                                                    <option value="0">Нет</option>
                                                                    <option value="1">ISO 22000:2005</option>
                                                                </Input>
                                                            );
                                                        case 1:
                                                            return (
                                                                <Input type="select" name="is_certification"
                                                                       id="select">
                                                                    <option value="1">ISO 22000:2005</option>
                                                                    <option value="0">Нет</option>
                                                                </Input>
                                                            );
                                                        default:
                                                            return (
                                                                <Input type="select" name="is_certification"
                                                                       id="select">
                                                                <option value="1">ISO 22000:2005</option>
                                                                <option value="0">Нет</option>
                                                            </Input>
                                                            );
                                                    }
                                                })()}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Региональный менеджер</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="regional_fio" name="regional_fio"
                                                   placeholder="ФИО регионального менеджера"
                                                   defaultValue={organization.head_fio}/>
                                            <FormText color="muted">Введите фио регионального менеджера</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">E-mail регионального менеджера</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" id="regional_email" name="regional_email"
                                                   placeholder="E-mail регионального менеджера"
                                                   defaultValue={organization.regional_email}/>
                                            <FormText color="muted">Введите e-mail регионального менеджера</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Руководитель</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="head_fio" name="head_fio"
                                                   placeholder="ФИО руководителя"
                                                   defaultValue={organization.head_fio}/>
                                            <FormText color="muted">Введите фио руководителя</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">E-mail руководителя</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" id="head_email" name="head_email"
                                                   placeholder="E-mail руководителя"
                                                   defaultValue={organization.head_email}/>
                                            <FormText color="muted">Введите e-mail руководителя</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Телефон руководителя</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="phone" name="phone"
                                                   placeholder="Телефон руководителя"
                                                   defaultValue={organization.phone}/>
                                            <FormText color="muted">Введите телефон руководителя</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">E-mail шеф-повара</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" id="chef_email" name="chef_email"
                                                   placeholder="E-mail шеф-повара"
                                                   defaultValue={organization.chef_email}/>
                                            <FormText color="muted">Введите e-mail шеф-повара</FormText>
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
                </Row>;
        }

        return (
            <div className="animated fadeIn">
                {errors}
                {formElements}
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{organization: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        organization: state.organizations.organization
    };
}

EditOrganization.propTypes = {
    dispatch: PropTypes.func.isRequired,
    organization: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditOrganization);
