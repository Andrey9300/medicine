import React from 'react';
import {connect} from 'react-redux';

class Main extends React.Component {
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

export default connect(mapStateToProps)(Main);
