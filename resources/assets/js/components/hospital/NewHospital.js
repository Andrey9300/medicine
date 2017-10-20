import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';

class NewHospital extends React.Component {
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

        axios.post('/hospitals/create', formData)
            .then(() => {
                this.context.router.push('/hospitals');
                NotificationManager.success('Hospital has been created!', 'Success', 5000);
            })
            .catch((error) => {
                const errors = error.response.data.messages;

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
            <div>
                <h1>Добавить медицинскую организацию</h1>
                <div className="col-lg-8">
                    {errors}
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Название" name="name" required/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Фактический адрес" name="address" required/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Расписание" name="shedule" required/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Фото карты" name="photo_map" required/>
                        </div>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Телефон" name="phone" required/>
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
export default NewHospital;
