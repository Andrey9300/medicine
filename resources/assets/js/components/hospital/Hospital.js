import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchHospital} from './../../actions/hospitalActions';
import HospitalResearches from './research/HospitalResearches';

class Hospital extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            hospitalId: props.params.id,
        };
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
                        {hospital.name}
                    </div>
                    <div className="form-group col-lg-6">
                        {hospital.address}
                    </div>
                    <div className="form-group col-lg-6">
                        {hospital.shedule}
                    </div>
                    <div className="form-group col-lg-6">
                        {hospital.photo_map}
                    </div>
                    <div className="form-group col-lg-6">
                        {hospital.phone}
                    </div>
                </div>;
        }

        return (
            <div>
                <h1>Медицинское учреждение</h1>
                <div className="col-lg-8">
                    {errors}
                    {formElements}
                </div>
                <HospitalResearches
                    idHospital={this.state.hospitalId}
                />
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

export default connect(mapStateToProps)(Hospital);
