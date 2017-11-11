import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchUser} from './../../actions/userActions';
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

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            userId: props.params.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/users/update/${this.state.userId}`, formData)
            .then(() => {
                this.context.router.push(`/users/${this.state.userId}`);
            })
            .catch((error) => {
                const errors = error.response.data.message;

                this.setState({
                    errors: errors
                });
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchUser(this.state.userId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {user} = this.props.user;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (user !== null) {
            formElements =
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                Редактировать сотрудника
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">ФИО</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="fio" name="fio"
                                                   placeholder="ФИО" defaultValue={user.fio} readOnly/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата рождения</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="date_birthday" name="date_birthday"
                                                   placeholder="Дата рождения"
                                                   defaultValue={user.date_birthday} readOnly/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата приема на работу</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="date_employment" name="date_employment"
                                                   placeholder="Дата приема на работу"
                                                   defaultValue={user.date_employment}/>
                                            <FormText color="muted">Введите дату приема на работу</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Номер медицинской книжки</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="medical_book" name="medical_book"
                                                   placeholder="Номер медицинской книжки"
                                                   defaultValue={user.medical_book}/>
                                            <FormText color="muted">Введите номер медицинской книжки</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Должность</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="role" name="role"
                                                   placeholder="Должность" defaultValue={user.role}/>
                                            <FormText color="muted">Введите должность</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Название организации</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="organization_name" name="organization_name"
                                                   placeholder="Название организации"
                                                   defaultValue={user.organization_name}/>
                                            <FormText color="muted">Введите название организации</FormText>
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
 * @returns {{user: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        user: state.users.user
    };
}

EditUser.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditUser);
