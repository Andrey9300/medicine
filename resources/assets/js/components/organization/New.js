import React from 'react';
import {fetchRegions} from './../../actions/regionActions';
import {fetchCategories} from './../../actions/categoryActions';
import {fetchLegalEntities} from '../../actions/legalEntityActions';
import {connect} from 'react-redux';
import {Row, Col, Button, Card, CardHeader, CardBlock, CardFooter, Form, FormGroup, FormText, Label, Input
} from 'reactstrap';
import {addOrganization} from '../../actions/organizationActions';

class NewOrganization extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchLegalEntities());
        this.props.dispatch(fetchRegions());
        this.props.dispatch(fetchCategories());
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(addOrganization(document.querySelector('form')));
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
        const {categories, legalEntities, regions, errors} = this.props;
        let errorsMessage = '';

        if (errors) {
            errorsMessage = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        return (
            <div className="animated fadeIn">
                {errorsMessage}
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <CardHeader>
                                    Добавить организацию
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
                                                {regions.map((region) => {
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
                                                   placeholder="Адрес"/>
                                            <FormText color="muted">Введите aдрес</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Юридическое лицо</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="legal_entity_id" id="legal_entity_id">
                                                {legalEntities.map((legalEntity) => {
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
                                            <Label htmlFor="text-input">ФИО руководителя</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="head_fio" name="head_fio"
                                                   placeholder="ФИО руководителя" required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">E-mail руководителя</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" id="head_email" name="head_email"
                                                   placeholder="E-mail руководителя" required/>
                                            <FormText color="muted">На этот e-mail будут присылаться уведомления
                                            </FormText>
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
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Категория</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="category_id" id="category">
                                                {categories.map((category) => {
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
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.organizations.errors,
        regions: state.regions.regions,
        categories: state.categories.categories,
        legalEntities: state.legalEntities.legalEntities,
        users: state.users.user
    };
};

export default connect(mapStateToProps)(NewOrganization);
