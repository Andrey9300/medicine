import React from 'react';
import {connect} from 'react-redux';
import {
  deletePlaceCheckList,
  fetchPlaceCheckListCriterions,
} from './../../actions/placeCheckListActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

class PlaceCheckListCriterions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeCheckListId: props.match.params.id,
    };

    this.map = {
      0: 'N',
      1: 'C',
      2: 'B',
      3: 'A',
    };
  }

  componentDidMount() {
    this.props.dispatch(
      fetchPlaceCheckListCriterions(this.state.placeCheckListId),
    );
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deletePlaceCheckList(id));
  }

  render() {
    const {placeCheckListId} = this.state;
    const {placeCheckListCriterions, errors} = this.props;
    let errorsMessage = '';

    if (!placeCheckListCriterions) {
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
                Критерии чек-лист
                <Link
                  to={`/lmk/placeCheckList/criterions/edit/${placeCheckListId}`}
                  style={{
                    marginLeft: '8px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Критерий</th>
                      <th>Оценка</th>
                      <th>Комментарий аудитора</th>
                      <th>Комментарий аудируемого</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placeCheckListCriterions.map((placeCheckListCriterion) => (
                      <tr key={placeCheckListCriterion.id}>
                        <td style={{maxWidth: '600px'}}>
                          {placeCheckListCriterion.criterion.name}
                        </td>
                        <td>{this.map[placeCheckListCriterion.mark]}</td>
                        <td>{placeCheckListCriterion.comment_from_auditor}</td>
                        <td>{placeCheckListCriterion.comment_at_auditor}</td>
                      </tr>
                    ))}
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

PlaceCheckListCriterions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    placeCheckListCriterions: state.placeCheckLists.placeCheckListCriterions,
    fetched: state.placeCheckLists.fetched,
    errors: state.placeCheckLists.errors,
  };
};

export const PlaceCheckListCriterionsContainer = connect(mapStateToProps)(
  PlaceCheckListCriterions,
);
