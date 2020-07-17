import React from 'react';
import {Link} from 'react-router-dom';

export class Footer extends React.PureComponent {
  render() {
    return (
      <footer className="app-footer d-print-none">
        <span
          style={{
            marginRight: '10px',
          }}
        >
          &copy; 2017 - {new Date().getFullYear()}
        </span>
        <span className="float-right">
          <span
            style={{
              color: '#1b8eb7',
            }}
          >
            Quality management{' '}
            <i className="fa fa-long-arrow-right" aria-hidden="true" />
          </span>
          <span
            style={{
              color: '#f86c6b',
            }}
          >
            {' '}
            Quality control{' '}
            <i className="fa fa-long-arrow-right" aria-hidden="true" />
          </span>
          <span
            style={{
              color: '#4dbd74',
            }}
          >
            {' '}
            Quality Assurance
          </span>
        </span>
        <Link to={'/blog'} target={'_blank'} style={{marginLeft: '20px'}}>
          <i className="fa fa-book" aria-hidden="true" /> Блог{' '}
          <i className="fa fa-external-link" aria-hidden="true" />
        </Link>
      </footer>
    );
  }
}
