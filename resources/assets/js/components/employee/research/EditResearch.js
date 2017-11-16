import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchEmployeeResearch} from './../../../actions/employeeActions';
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

class EditEmployeeResearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            employeeId: props.params.idEmployee
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/employees/researches/update/${this.state.employeeId}/${this.props.params.idResearch}`, formData)
            .then(() => {
                this.context.router.push(`/employees/${this.state.employeeId}`);
            })
            .catch((error) => {
                const errors = error.response.data.message;

                this.setState({
                    errors: errors
                });
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchEmployeeResearch(this.state.employeeId, this.props.params.idResearch));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {employeeResearch} = this.props.employeeResearch;

        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (employeeResearch !== null) {
            formElements =
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                Редактировать исследование сотрудника
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name"
                                                   defaultValue={employeeResearch.name} readOnly/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Период</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            {(() => {
                                                let period = '';

                                                switch (employeeResearch.period) {
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
                                                        period = 'Раз в год';
                                                        break;
                                                }

                                                return <Input type="text" id="period" name="period"
                                                              defaultValue={period} readOnly/>;
                                            })()}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="date" name="date"
                                                   defaultValue={employeeResearch.pivot.date}/>
                                            <FormText color="muted">Введите дату</FormText>
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
            <div>
                {errors}
                {formElements}
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{employee: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        employeeResearch: state.employees.employeeResearch
    };
}

EditEmployeeResearch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    employeeResearch: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditEmployeeResearch);
