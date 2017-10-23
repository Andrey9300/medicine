import React from 'react';
import {connect} from 'react-redux';
import {fetchUser} from './../../actions/userActions';
import UserResearches from './research/UserResearches';

class User extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            userId: props.params.id,
        };
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
                        {user.fio}
                    </div>
                    <div className="form-group col-lg-6">
                        {user.date_birthday}
                    </div>
                    <div className="form-group col-lg-6">
                        {user.date_employment}
                    </div>
                    <div className="form-group col-lg-6">
                        {user.medical_book}
                    </div>
                    <div className="form-group col-lg-6">
                        {user.role}
                    </div>
                    <div className="form-group col-lg-6">
                        {user.email}
                    </div>
                    <div className="form-group col-lg-6">
                        {user.organization_name}
                    </div>
                </div>;
        }

        return (
            <div>
                <h1>Cотрудник</h1>
                <div className="col-lg-8">
                    {errors}
                    {formElements}
                </div>
                <UserResearches
                    idUser={this.state.userId}
                />
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

export default connect(mapStateToProps)(User);
