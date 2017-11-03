import React from 'react';

import Header from '../components/includes/Header';
import Footer from '../components/includes/Footer';
import Sidebar from '../components/includes/Sidebar';

import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';

export default class Layout extends React.Component {
    componentDidMount(){

    }

    render() {
        const {location} = this.props;

        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar location={location}/>
                    <main className="main">
                        {this.props.children}
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
}
