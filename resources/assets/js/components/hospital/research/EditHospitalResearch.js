import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchHospitalResearch} from './../../../actions/hospitalActions';

class EditHospitalResearch extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            hospitalId: props.params.idHospital,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/hospitals/researches/update/${this.state.hospitalId}/${this.props.params.idResearch}`, formData)
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
        this.props.dispatch(fetchHospitalResearch(this.state.hospitalId, this.props.params.idResearch));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {hospitalResearch} = this.props;

        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (hospitalResearch !== null) {
            formElements =
                <div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Наименование"
                               name="name" defaultValue={hospitalResearch.name} readOnly/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Период" name="address"
                               defaultValue={hospitalResearch.period} readOnly/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Цена" name="price"
                               defaultValue={hospitalResearch.pivot.price}/>
                    </div>
                </div>;
        }

        return (
            <div>
                <h1>Редактировать цену исследования</h1>
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
        hospitalResearch: state.hospitals.hospitalResearch
    };
}

export default connect(mapStateToProps)(EditHospitalResearch);
