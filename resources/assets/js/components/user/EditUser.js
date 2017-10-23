import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchUser} from './../../actions/userActions';

class EditUser extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            userId: props.params.id,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/users/update/${this.state.userId}`, formData)
            .then(() => {
                this.context.router.push('/users');
                NotificationManager.success('User has been updated!', 'Success');
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
        this.props.dispatch(fetchUser(this.state.userId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {user} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (user !== null) {
            formElements =
                <div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="ФИО" name="fio"
                               defaultValue={user.fio}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Дата рождения" name="date_birthday"
                               defaultValue={user.date_birthday}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Дата приема на работу" name="date_employment"
                               defaultValue={user.date_employment}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Номер медицинской книжки" name="medical_book"
                               defaultValue={user.medical_book}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Должность" name="role"
                               defaultValue={user.role}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input type="email" className="form-control" placeholder="E-mail" name="email"
                               defaultValue={user.email}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Название организации" name="organization_name"
                               defaultValue={user.organization_name}/>
                    </div>
                </div>;
        }

        return (
            <div>
                <h1>Редактировать сотрудника</h1>
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
 * @returns {{user: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        user: state.users.user
    };
}

export default connect(mapStateToProps)(EditUser);
