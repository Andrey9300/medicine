import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchHospital} from './../../actions/hospitalActions';
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

class EditHospital extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            hospitalId: props.params.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/hospitals/update/${this.state.hospitalId}`, formData)
            .then(() => {
                hashHistory.push(`/hospitals/${this.state.hospitalId}`);
            })
            .catch((error) => {
                const errors = error.response.data.message;

                this.setState({
                    errors: errors
                });
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchHospital(this.state.hospitalId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {hospital} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (hospital !== null) {
            formElements =
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <CardHeader>
                                    Редактировать медицинское учреждение
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name" placeholder="Наименование"
                                                   defaultValue={hospital.name}/>
                                            <FormText color="muted">Введите наименование</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Период</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="region_id" id="select"
                                                   defaultValue={hospital.region.id}>
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
                                            <Input type="text" id="address" name="address" placeholder="Адрес"
                                                   defaultValue={hospital.address}/>
                                            <FormText color="muted">Введите aдрес</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Расписание</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="shedule" name="shedule" placeholder="Расписание"
                                                   defaultValue={hospital.shedule}/>
                                            <FormText color="muted">Введите расписание</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Фото карты</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="photo_map" name="photo_map" placeholder="Фото карты"
                                                   defaultValue={hospital.photo_map}/>
                                            <FormText color="muted">Загрузите фото карты</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Телефон</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="phone" name="phone" placeholder="Телефон"
                                                   defaultValue={hospital.phone}/>
                                            <FormText color="muted">Введите телефон</FormText>
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
 * @returns {{hospital: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        hospital: state.hospitals.hospital,
        regions: state.hospitals.regions
    };
}

EditHospital.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditHospital);
