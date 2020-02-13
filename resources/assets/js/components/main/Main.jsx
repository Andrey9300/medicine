import React from 'react';
import {connect} from 'react-redux';

class MainComponent extends React.Component {
    render() {
        return (
            <div>123</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user
    };
};

export const Main = connect(mapStateToProps)(MainComponent);
