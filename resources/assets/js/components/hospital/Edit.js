import React from 'react';
import {connect} from 'react-redux';
import {fetchHospital} from './../../actions/hospitalActions';
import {fetchRegions} from './../../actions/regionActions';
import PropTypes from 'prop-types';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input
} from 'reactstrap';
import {editHospital} from '../../actions/hospitalActions';

class EditHospital extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitalId: props.params.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(editHospital(document.querySelector('form'), this.state.hospitalId));
    }

    componentWillMount() {
        this.props.dispatch(fetchRegions());
        this.props.dispatch(fetchHospital(this.state.hospitalId));
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
        const {hospital, regions, errors} = this.props;
        let errorsMessage = '';

        if (errors) {
            errorsMessage = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (hospital === null) {
            return null;
        }

        return (
            <div>
                {errorsMessage}
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
                                                   defaultValue={hospital.name} required/>
                                            <FormText color="muted">Введите наименование</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Регион</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="region_id" id="select"
                                                   defaultValue={hospital.region.id}>
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
                                            <Input type="text" id="address" name="address" placeholder="Адрес"
                                                   defaultValue={hospital.address} required/>
                                            <FormText color="muted">Введите aдрес</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Контактное лицо</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="head_fio" name="head_fio"
                                                   placeholder="Контактное лицо"
                                                   defaultValue={hospital.head_fio} required/>
                                            <FormText color="muted">Введите контактное лицо</FormText>
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
                </Row>
            </div>
        );
    }
}

EditHospital.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        errors: state.hospitals.errors,
        hospital: state.hospitals.hospital,
        regions: state.regions.regions
    };
};

export default connect(mapStateToProps)(EditHospital);
