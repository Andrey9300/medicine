import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchHospitalResearch} from './../../../actions/hospitalActions';
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

class EditHospitalResearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            hospitalId: props.params.idHospital
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/hospitals/researches/update/${this.state.hospitalId}/${this.props.params.idResearch}`, formData)
            .then(() => {
                this.context.router.push(`/hospitals/${this.state.hospitalId}`);
            })
            .catch((error) => {
                const errors = error.response.data.message;

                this.setState({
                    errors: errors
                });
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchHospitalResearch(this.state.hospitalId, this.props.params.idResearch));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {hospitalResearch} = this.props.hospitalResearch;

        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (hospitalResearch !== null) {
            formElements =
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                Редактировать цену исследования
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name"
                                                   defaultValue={hospitalResearch.name} readOnly/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Период</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            {(() => {
                                                let period = '';

                                                switch (hospitalResearch.period) {
                                                    case '-1':
                                                        period = 'При поступлении на работу.' +
                                                                 'При смене юридического лица';
                                                        break;
                                                    case '1':
                                                        period = 'Раз в жизни';
                                                        break;
                                                    case '365':
                                                        period = 'Раз в год';
                                                        break;
                                                    case '730':
                                                        period = 'Раз в два года';
                                                        break;
                                                    case '1827':
                                                        period = 'Раз в 5 лет';
                                                        break;
                                                    case '3653':
                                                        period = 'Раз в 10 лет';
                                                        break;
                                                    default:
                                                        break;
                                                }

                                                return <Input type="text" id="period" name="period"
                                                       defaultValue={period} readOnly/>;
                                            })()}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Цена</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="price" name="price"
                                                   defaultValue={hospitalResearch.pivot.price}/>
                                            <FormText color="muted">Введите цену</FormText>
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
 * @returns {{hospital: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        hospitalResearch: state.hospitals.hospitalResearch
    };
}

EditHospitalResearch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    hospitalResearch: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditHospitalResearch);
