import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchOrganization} from './../../actions/organizationActions';
import {fetchCategories} from '../../actions/categoryActions';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, Label, Input
} from 'reactstrap';
import {editOrganization} from '../../actions/organizationActions';

class EditOrganization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationId: props.match.params.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(editOrganization(document.querySelector('form'), this.state.organizationId));
    }

    componentWillMount() {
        this.props.dispatch(fetchCategories());
        this.props.dispatch(fetchOrganization(this.state.organizationId));
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
        const {organization, categories, errors} = this.props;
        let errorsMessage = '';

        if (errors) {
            errorsMessage = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (!organization) {
            return null;
        }

        return (
            <div className="animated fadeIn">
                {errorsMessage}
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
                                            <Label htmlFor="text-input">Категория</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="category_id" id="select"
                                                   defaultValue={organization.category.id}>
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

EditOrganization.propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    errors: PropTypes.array,
    categories: PropTypes.array,
    organization: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        errors: state.organizations.errors,
        categories: state.categories.categories,
        organization: state.organizations.organization
    };
};

export default connect(mapStateToProps)(EditOrganization);
