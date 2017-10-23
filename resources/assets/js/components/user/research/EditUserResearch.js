import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchUserResearch} from './../../../actions/userActions';

class EditUserResearch extends React.Component {
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

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/users/researches/update/${this.state.userId}/${this.props.params.idResearch}`, formData)
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
        this.props.dispatch(fetchUserResearch(this.state.userId, this.props.params.idResearch));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {userResearch} = this.props;

        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (userResearch !== null) {
            formElements =
                <div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Наименование"
                               name="name" defaultValue={userResearch.name} readOnly/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Период" name="address"
                               defaultValue={userResearch.period} readOnly/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Цена" name="price"
                               defaultValue={userResearch.pivot.price}/>
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
 * @returns {{user: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        userResearch: state.users.userResearch
    };
}

export default connect(mapStateToProps)(EditUserResearch);
