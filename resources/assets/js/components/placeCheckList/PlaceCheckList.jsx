import React from 'react';
import {connect} from 'react-redux';
import {
  fetchPlaceCheckList,
  deletePlaceCheckList,
} from './../../actions/placeCheckListActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';
import {PlaceCheckListsContainer} from './PlaceCheckLists';

class PlaceCheckListCheckList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeCheckListId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchPlaceCheckList(this.state.placeCheckListId));
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deletePlaceCheckList(id));
  }

  render() {
    const {placeCheckList, errors} = this.props;
    let errorsMessage = '';

    if (!placeCheckList) {
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
                Помещение чек-лист
                <Link
                  to={`/placeCheckLists/edit/${placeCheckList.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) => this.handleBtnDelete(placeCheckList.id, event)}
                >
                  <i className="fa fa-trash" />
                </span>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Подразделение:</td>
                      <td>{placeCheckList.unit.name}</td>
                    </tr>
                    <tr>
                      <td>Локация:</td>
                      <td>{placeCheckList.location.name}</td>
                    </tr>
                    <tr>
                      <td>Помещение:</td>
                      <td>{placeCheckList.place.name}</td>
                    </tr>
                    <tr>
                      <td>Группа критериев:</td>
                      <td>{placeCheckList.groupCriterion.name}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <PlaceCheckListsContainer />
        </Row>
      </div>
    );
  }
}

PlaceCheckListCheckList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    placeCheckList: state.placeCheckLists.placeCheckList,
    fetched: state.placeCheckLists.fetched,
    errors: state.placeCheckLists.errors,
  };
};

export const PlaceCheckListContainer = connect(mapStateToProps)(PlaceCheckListCheckList);
