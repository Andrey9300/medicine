import {fetchResearches} from '../../../actions/researchActions';
import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class NewUserResearch extends React.Component {
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

    componentWillMount() {
        this.props.dispatch(fetchResearches());
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/users/researches/create/${this.props.params.idUser}`, formData)
            .then(() => {
                this.context.router.push('/users');
                NotificationManager.success('User has been created!', 'Success', 5000);
            })
            .catch((error) => {
                const errors = error.response.data.message;

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
                <h1>Добавить исследования к медицинской организации</h1>
                <div className="col-lg-8">
                    {errors}
                    <form method="post" onSubmit={this.handleSubmit}>
                        <select className="custom-select" name="name">
                            {this.props.researches.map((research) => {
                                return (
                                    <option key={research.id} value={research.id}>{research.name}</option>
                                );
                            })}
                        </select>
                        <div className="form-group col-lg-6">
                            <input className="form-control" placeholder="Дата обследования" name="date" required/>
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

/**
 * Map
 * @param state
 * @returns {{researchesUser: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        researches: state.researches.researches
    };
}
export default connect(mapStateToProps)(NewUserResearch);
