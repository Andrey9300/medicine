import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchResearch} from './../../actions/researchActions';
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

class EditResearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            researchId: props.params.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/researches/update/${this.state.researchId}`, formData)
            .then(() => {
                this.context.router.push('/researches');
            })
            .catch((error) => {
                const errors = error.response.data.message;

                this.setState({
                    errors: errors
                });
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchResearch(this.state.researchId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {research} = this.props.research;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (research !== null) {
            formElements =
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                Редактировать исследование
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name"
                                                   placeholder="Наименование" defaultValue={research.name}/>
                                            <FormText color="muted">Введите наименование</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                                {(() => {
                                                    switch (research.period) {
                                                        case '-1':
                                                            return (
                                                                <Input type="select" name="period" id="select">
                                                                    <option value="-1">
                                                                        При поступлении на работу.
                                                                        При смене юридического лица
                                                                    </option>
                                                                    <option value="1">Раз в жизни</option>
                                                                    <option value="365">Раз в год</option>
                                                                    <option value="730">Раз в два года</option>
                                                                    <option value="1827">Раз в 5 лет</option>
                                                                    <option value="3653">Раз в 10 лет</option>
                                                                </Input>
                                                            );
                                                        case '1':
                                                            return (
                                                                <Input type="select" name="period" id="select">
                                                                    <option value="1">Раз в жизни</option>
                                                                    <option value="-1">
                                                                        При поступлении на работу.
                                                                        При смене юридического лица
                                                                    </option>
                                                                    <option value="365">Раз в год</option>
                                                                    <option value="730">Раз в два года</option>
                                                                    <option value="1827">Раз в 5 лет</option>
                                                                    <option value="3653">Раз в 10 лет</option>
                                                                </Input>
                                                            );
                                                        case '365':
                                                            return (
                                                                <Input type="select" name="period" id="select">
                                                                    <option value="365">Раз в год</option>
                                                                    <option value="1">Раз в жизни</option>
                                                                    <option value="-1">
                                                                        При поступлении на работу.
                                                                        При смене юридического лица
                                                                    </option>
                                                                    <option value="730">Раз в два года</option>
                                                                    <option value="1827">Раз в 5 лет</option>
                                                                    <option value="3653">Раз в 10 лет</option>
                                                                </Input>
                                                            );
                                                        case '730':
                                                            return (
                                                                <Input type="select" name="period" id="select">
                                                                    <option value="730">Раз в два года</option>
                                                                    <option value="-1">
                                                                        При поступлении на работу.
                                                                        При смене юридического лица
                                                                    </option>
                                                                    <option value="1">Раз в жизни</option>
                                                                    <option value="365">Раз в год</option>
                                                                    <option value="1827">Раз в 5 лет</option>
                                                                    <option value="3653">Раз в 10 лет</option>
                                                                </Input>
                                                            );
                                                        case '1827':
                                                            return (
                                                                <Input type="select" name="period" id="select">
                                                                    <option value="1827">Раз в 5 лет</option>
                                                                    <option value="-1">
                                                                        При поступлении на работу.
                                                                        При смене юридического лица
                                                                    </option>
                                                                    <option value="1">Раз в жизни</option>
                                                                    <option value="365">Раз в год</option>
                                                                    <option value="730">Раз в два года</option>
                                                                    <option value="3653">Раз в 10 лет</option>
                                                                </Input>
                                                            );
                                                        case '3653':
                                                            return (
                                                                <Input type="select" name="period" id="select">
                                                                    <option value="3653">Раз в 10 лет</option>
                                                                    <option value="-1">
                                                                        При поступлении на работу.
                                                                        При смене юридического лица
                                                                    </option>
                                                                    <option value="1">Раз в жизни</option>
                                                                    <option value="365">Раз в год</option>
                                                                    <option value="730">Раз в два года</option>
                                                                    <option value="1827">Раз в 5 лет</option>
                                                                </Input>
                                                            );
                                                        default: return (
                                                            <Input type="select" name="period" id="select">
                                                                <option value="3653">Раз в 10 лет</option>
                                                                <option value="-1">
                                                                    При поступлении на работу.
                                                                    При смене юридического лица
                                                                </option>
                                                                <option value="1">Раз в жизни</option>
                                                                <option value="365">Раз в год</option>
                                                                <option value="730">Раз в два года</option>
                                                                <option value="1827">Раз в 5 лет</option>
                                                            </Input>
                                                        );
                                                    }
                                                })()}
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
 * @returns {{research: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        research: state.researches.research
    };
}

EditResearch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    research: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditResearch);
