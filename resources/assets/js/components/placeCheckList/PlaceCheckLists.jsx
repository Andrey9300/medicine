import {fetchPlaces} from '../../actions/placeActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Col, Card, CardHeader, CardBody, Table} from 'reactstrap';

class PlaceCheckLists extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchPlaces());
  }

  render() {
    const {places, placeId} = this.props;

    if (!places || places.length === 0) {
      return (
        <Col xs="12" sm="12" md="8" lg="6" xl="6">
          <Card className="text-center">
            <CardHeader>
              <i className="fa fa-building-o" aria-hidden="true" />
              Чек-листов помещений нет
              <Link
                to={`/services/lmk/addPlaceCheckList/${placeId}`}
                className="btn btn-primary btn-sm pull-right"
              >
                Добавить <i className="icon-plus" />
              </Link>
            </CardHeader>
          </Card>
        </Col>
      );
    }

    return (
      <Col xs="12" sm="12" md="8" lg="6" xl="6">
        <Card>
          <CardHeader>
            <i className="fa fa-building-o" aria-hidden="true" />
            Чек-листы помещения ({places.length})
            <Link
              to={`/services/lmk/addPlaceCheckList/${placeId}`}
              className="btn btn-primary btn-sm pull-right"
            >
              Добавить <i className="icon-plus" />
            </Link>
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
                        <Link to={`/services/lmk/place/${place.id}`}>{place.name}</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

PlaceCheckLists.propTypes = {
  dispatch: PropTypes.func.isRequired,
  places: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    places: state.places.places,
  };
};

export const PlaceCheckListsContainer = connect(mapStateToProps)(
  PlaceCheckLists,
);
