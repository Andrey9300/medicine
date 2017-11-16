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
import {hashHistory} from 'react-router';

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
                hashHistory.push(`/organizations/${this.state.organizationId}`);
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
        const {organization} = this.props;
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
                            <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <CardHeader>
                                    Редактировать организацию
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name"
                                                   defaultValue={organization.name} readOnly/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Регион</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="region_id" name="region_id"
                                                   defaultValue={organization.region.name} readOnly/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Адрес</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="address" name="address"
                                                   defaultValue={organization.address} readOnly/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Юридическое лицо</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="legal_entity" name="legal_entity"
                                                   defaultValue={organization.legal_entity} readOnly/>
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
                                            <Label htmlFor="text-input">Категория</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="category_id" name="category_id"
                                                   defaultValue={organization.category.name} readOnly/>
                                            <FormText color="muted">Введите телефон руководителя</FormText>
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
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditOrganization);
