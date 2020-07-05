import React from 'react';
import {connect} from 'react-redux';
import {
  fetchPlace,
  deletePlace,
} from '../../actions/audit/placeActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

class Place extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeId: props.match.params.id,
    };
  }

  componentDidMount() {
    console.log('sss');
    this.props.dispatch(fetchPlace(this.state.placeId));
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deletePlace(id));
  }

  render() {
    const {place, errors} = this.props;
    let errorsMessage = '';

    if (!place) {
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
                Помещение
                <Link
                  to={`/services/audits/place/edit/${place.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) => this.handleBtnDelete(place.id, event)}
                >
                  <i className="fa fa-trash" />
                </span>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Наименование:</td>
                      <td>{place.name}</td>
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

Place.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    place: state.places.place,
    fetched: state.places.fetched,
    errors: state.places.errors,
  };
};

export const PlaceContainer = connect(mapStateToProps)(Place);
