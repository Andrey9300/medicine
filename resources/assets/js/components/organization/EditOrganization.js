import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchOrganization} from './../../actions/organizationActions';

class EditOrganization extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            errors: '',
            organizationId: props.params.id,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/organizations/update/${this.state.organizationId}`, formData)
            .then(() => {
                this.context.router.push('/organizations');
                NotificationManager.success('Organization has been updated!', 'Success');
            })
            .catch((error) => {
                const errors = error.response.data.data;

                this.setState({
                    errors: errors
                });
                NotificationManager.error('Error occured during operation!', 'Error', errors);
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganization(this.state.organizationId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {organization} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (organization !== null) {
            formElements =
                <div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Название"
                               name="name" defaultValue={organization.name} readOnly/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Адрес" name="address"
                               defaultValue={organization.address} readOnly/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Юридическое лицо" name="legal_entity"
                               defaultValue={organization.legal_entity} readOnly/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="ФИО руководителя" name="head_fio"
                               defaultValue={organization.head_fio}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="E-mail руководителя" name="head_email"
                               defaultValue={organization.head_email}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="E-mail менеджера" name="regional_email"
                               defaultValue={organization.regional_email}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="E-mail шеф-повара" name="chef_email"
                               defaultValue={organization.chef_email}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Телефон" name="phone"
                               defaultValue={organization.phone}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Сертифирован" name="is_certification"
                               defaultValue={organization.is_certification}/>
                    </div>
                </div>;
        }

        return (
            <div>
                <h1>Редактировать организацию</h1>
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
 * @returns {{organization: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        organization: state.organizations.organization
    };
}

export default connect(mapStateToProps)(EditOrganization);
