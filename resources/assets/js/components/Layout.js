import Navigation from '../components/includes/Navigation';
import React from 'react';

export default class Layout extends React.Component {
    render() {
        const {location} = this.props;
        const containerStyle = {
            marginTop: '60px'
        };

        return (
            <div>
                <Navigation location={location}/>
                <div className="container" style={containerStyle}>
                    <div className="row">
                        <div className="col-lg-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
