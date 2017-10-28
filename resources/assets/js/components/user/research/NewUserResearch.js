import {fetchResearches} from '../../../actions/researchActions';
import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
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

class NewUserResearch extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            userId: props.params.idUser,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchResearches());
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/users/researches/create/${this.props.params.idUser}`, formData)
            .then(() => {
                this.context.router.push('/users');
                NotificationManager.success('User has been created!', 'Success', 5000);
            })
            .catch((error) => {
                const errors = error.response.data.message;

                this.setState({
                    errors: errors
                });
                NotificationManager.error('Error occured during operation!', 'Error', 5000);
            });
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        let errors = '';

        if (this.state.errors) {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        return (
            <div className="animated fadeIn">
            {errors}
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                Добавить исследования к медицинской организации
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Исследование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="name" id="select">
                                                {this.props.researches.map((research) => {
                                                    return (
                                                        <option key={research.id} value={research.id}>{research.name}</option>
                                                    );
                                                })}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Дата</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="date" name="text-input" placeholder="Дата"/>
                                            <FormText color="muted">Введите дату обследования</FormText>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBlock>
                            <CardFooter>
                                <Button type="submit" size="sm" color="success" onClick={this.handleSubmit}>
                                    <i className="fa fa-dot-circle-o"></i> Сохранить
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{researchesUser: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        researches: state.researches.researches
    };
}
export default connect(mapStateToProps)(NewUserResearch);
