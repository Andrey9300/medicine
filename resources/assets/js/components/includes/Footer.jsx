import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer d-print-none">
        <span style={{
          marginRight: '10px'
        }}>&copy; 2017</span>
        <span className="float-right">
          <span style={{
            color: '#1b8eb7'
          }}>Quality management
            <i className="fa fa-long-arrow-right" aria-hidden="true" />
          </span>
          <span style={{
            color: '#f86c6b'
          }}> Quality control
            <i className="fa fa-long-arrow-right" aria-hidden="true" />
          </span>
          <span style={{
            color: '#4dbd74'
          }}> Quality Assurance</span>
        </span>
      </footer>
    );
  }
}

export default Footer;
