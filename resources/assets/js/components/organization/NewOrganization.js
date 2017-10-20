import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';

class NewOrganization extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            errors: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post('/organizations/create', formData)
            .then(() => {
                this.context.router.push('/organizations');
                NotificationManager.success('Organization has been created!', 'Success');
            })
            .catch((error) => {
                const errors = error.response.data.message;

                this.setState({
                    errors: errors
                });
                NotificationManager.error('Error occured during operation!', 'Error');
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
            <div>
                <h1>Добавить организацию</h1>
                <div className="col-lg-8">
                    {errors}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Название" name="name" required/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Адрес" name="address" required/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Юридическое лицо" name="legal_entity" required/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="ФИО руководителя" name="head_fio" required/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input type="email" className="form-control" placeholder="E-mail руководителя" name="head_email" required/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input type="email" className="form-control" placeholder="E-mail менеджера" name="regional_email"/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input type="email" className="form-control" placeholder="E-mail шеф-повара" name="chef_email"/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Телефон" name="phone"/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Сертифирован" name="is_certification" required/>
                        </div>
                        <div className="form-group col-lg-6">
                            <button type="submit" className="btn btn-primary btn-block">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default NewOrganization;
