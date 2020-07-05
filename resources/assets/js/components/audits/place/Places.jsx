import {fetchPlaces} from '../../../actions/audit/placeActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {NewPlaceContainer} from './New';

class Places extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchPlaces());
  }

  render() {
    const {places} = this.props;

    if (!places || places.length === 0) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="8" lg="6" xl="6">
              <Card className="text-center">
                <CardHeader>
                  <i className="fa fa-building-o" aria-hidden="true" />
                  Помещений нет
                </CardHeader>
              </Card>
            </Col>
            <NewPlaceContainer />
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
                Помещения ({places.length})
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                    </tr>
                  </thead>
                  <tbody>
                    {places.map((place) => {
                      return (
                        <tr key={place.id}>
                          <td>
                            <Link to={`/services/audits/place/${place.id}`}>
                              {place.name}
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
          <NewPlaceContainer />
        </Row>
      </div>
    );
  }
}

Places.propTypes = {
  dispatch: PropTypes.func.isRequired,
  places: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    places: state.places.places,
  };
};

export const PlacesContainer = connect(mapStateToProps)(Places);
