import {fetchLocations} from '../../actions/locationActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {NewLocationContainer} from './New';

class Locations extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchLocations());
  }

  render() {
    const {locations} = this.props;

    if (locations.length === 0) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="8" lg="6" xl="6">
              <Card className="text-center">
                <CardHeader>
                  <i className="fa fa-building-o" aria-hidden="true" />
                  Локаций нет
                </CardHeader>
              </Card>
            </Col>
            <NewLocationContainer />
          </Row>
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="8" lg="6" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Локации ({locations.length})
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((location) => {
                      return (
                        <tr key={location.id}>
                          <td>
                            <Link to={`/location/${location.id}`}>
                              {location.name}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <NewLocationContainer />
        </Row>
      </div>
    );
  }
}

Locations.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    locations: state.locations.locations,
  };
};

export const LocationsContainer = connect(mapStateToProps)(Locations);
