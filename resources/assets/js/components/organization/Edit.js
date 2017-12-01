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
import {fetchLegalEntities} from '../../actions/legalEntityActions';
import {fetchRegions} from '../../actions/regionActions';
import {fetchCategories} from '../../actions/categoryActions';

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

        axios.post(`/organizations/update/${this.state.organizationId}`, new FormData(formElement))
            .then(() => {
                hashHistory.push(`/organizations/${this.state.organizationId}`);
            })
            .catch((errors) => {
                this.setState({
                    errors: errors.response.data.errors
                });
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchRegions());
        this.props.dispatch(fetchCategories());
        this.props.dispatch(fetchLegalEntities());
        this.props.dispatch(fetchOrganization(this.state.organizationId));
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
        if (this.props.organization && nextProps.organization && nextProps.organization.legal_entity !== this.props.organization.legal_entity) {
            window.location.reload();
        }
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
                                                   defaultValue={organization.name}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Регион</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="region_id" id="select"
                                                   defaultValue={organization.region.id}>
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
                                            <Label htmlFor="text-input">Адрес</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="address" name="address"
                                                   defaultValue={organization.address}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Юридическое лицо</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="legal_entity_id" id="select"
                                                   defaultValue={organization.legal_entity.id}>
                                                { this.props.legalEntities.map((legalEntity) => {
                                                    return (
                                                        <option key={legalEntity.id} value={legalEntity.id}>
                                                            {legalEntity.name}
                                                        </option>
                                                    );
                                                })
                                                }
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">E-mail руководителя</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" id="head_email" name="head_email"
                                                   placeholder="E-mail руководителя"
                                                   defaultValue={organization.head_email}
                                                   required/>
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
                                            <Input type="select" name="region_id" id="select"
                                                   defaultValue={organization.category.id}>
                                                { this.props.categories.map((category) => {
                                                    return (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
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
        regions: state.regions.regions,
        categories: state.categories.categories,
        legalEntities: state.legalEntities.legalEntities,
        organization: state.organizations.organization
    };
}

EditOrganization.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditOrganization);
