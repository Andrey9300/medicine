import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchHospital} from './../../actions/hospitalActions';

class EditHospital extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            hospitalId: props.params.id,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/hospitals/update/${this.state.hospitalId}`, formData)
            .then(() => {
                this.context.router.push('/hospitals');
                NotificationManager.success('Hospital has been updated!', 'Success');
            })
            .catch((error) => {
                const errors = error.response.data.message;

                this.setState({
                    errors: errors
                });
                NotificationManager.error('Error occured during operation!', 'Error', errors);
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
                <div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Название"
                               name="name" defaultValue={hospital.name}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Адрес" name="address"
                               defaultValue={hospital.address}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Расписание" name="shedule"
                               defaultValue={hospital.shedule}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Фото карты" name="photo_map"
                               defaultValue={hospital.photo_map}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Телефон" name="phone"
                               defaultValue={hospital.phone}/>
                    </div>
                </div>;
        }

        return (
            <div>
                <h1>Редактировать медицинское учреждение</h1>
                <div className="col-lg-8">
                    {errors}
                    <form onSubmit={this.handleSubmit}>
                        {formElements}
                        <div className="form-group col-lg-6">
                            <button type="submit" className="btn btn-primary btn-block">Сохранить</button>
                        </div>
                    </form>
                </div>
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
        hospital: state.hospitals.hospital
    };
}

export default connect(mapStateToProps)(EditHospital);
