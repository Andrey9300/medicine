import React from 'react';
import {connect} from 'react-redux';
import {
  fetchLocation,
  deleteLocation,
} from '../../../actions/audit/locationActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {ILocation} from '../../../interface/audit/ILocation';
import {TState} from '../../../reducers';

interface IStateProps {
  location: ILocation;
  errors: any;
}

interface IDispatchProps {
  fetchLocation: typeof fetchLocation;
  deleteLocation: typeof deleteLocation;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  locationId: number;
}

class Location extends React.PureComponent<IProps> {
  public state: IState = {
    locationId: null,
  };

  componentDidMount() {
    const {match, fetchLocation} = this.props;

    this.setState({locationId: match.params.id});
    fetchLocation(match.params.id);
  }

  private handleBtnDelete = (id: number, event: any) => {
    event.preventDefault();
    const {deleteLocation} = this.props;

    deleteLocation(id);
  };

  render() {
    const {location, errors} = this.props;
    let errorsMessage = null;

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
                  to={`/services/audits/location/edit/${location.id}`}
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

const mapStateToProps = (state: TState) => {
  return {
    location: state.locations.location,
    fetched: state.locations.fetched,
    errors: state.locations.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchLocation: (id: number) => dispatch(fetchLocation(id)),
    deleteLocation: (id: number) => dispatch(deleteLocation(id)),
  };
};

export const LocationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Location);
