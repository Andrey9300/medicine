import {NotificationManager} from 'react-notifications';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchResearch} from './../../actions/researchActions';

class EditResearch extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            errors: '',
            researchId: props.params.id,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/researches/update/${this.state.researchId}`, formData)
            .then(() => {
                this.context.router.push('/researches');
                NotificationManager.success('Research has been updated!', 'Success');
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
        this.props.dispatch(fetchResearch(this.state.researchId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {research} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (research !== null) {
            formElements =
                <div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Наименование"
                               name="name" defaultValue={research.name}/>
                    </div>
                    <div className="form-group col-lg-6">
                        <input className="form-control" placeholder="Период" name="period"
                               defaultValue={research.period}/>
                    </div>
                </div>;
        }

        return (
            <div>
                <h1>Редактировать исследование</h1>
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
 * @returns {{research: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        research: state.researches.research
    };
}

export default connect(mapStateToProps)(EditResearch);
