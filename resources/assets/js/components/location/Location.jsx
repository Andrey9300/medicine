import React from 'react';
import {connect} from 'react-redux';
import {
  fetchLocation,
  deleteLocation,
} from './../../actions/locationActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

class Location extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      locationId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchLocation(this.state.locationId));
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deleteLocation(id));
  }

  render() {
    const {location, errors} = this.props;
    let errorsMessage = '';

    if (!location) {
      return null;
    }

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Критерий
                <Link
                  to={`/locations/edit/${location.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) => this.handleBtnDelete(location.id, event)}
                >
                  <i className="fa fa-trash" />
                </span>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Наименование:</td>
                      <td>{location.name}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Location.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    location: state.locations.location,
    fetched: state.locations.fetched,
    errors: state.locations.errors,
  };
};

export const LocationContainer = connect(mapStateToProps)(Location);
