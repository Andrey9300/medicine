import React from 'react';
import {connect} from 'react-redux';
import {
  fetchUnit,
  deleteUnit,
} from '../../../actions/audit/unitActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';

class Unit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      unitId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchUnit(this.state.unitId));
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deleteUnit(id));
  }

  render() {
    const {unit, errors} = this.props;
    let errorsMessage = '';

    if (!unit) {
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
                Подразделения
                <Link
                  to={`/services/audits/unit/edit/${unit.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) => this.handleBtnDelete(unit.id, event)}
                >
                  <i className="fa fa-trash" />
                </span>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Наименование:</td>
                      <td>{unit.name}</td>
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

Unit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    unit: state.units.unit,
    fetched: state.units.fetched,
    errors: state.units.errors,
  };
};

export const UnitContainer = connect(mapStateToProps)(Unit);
