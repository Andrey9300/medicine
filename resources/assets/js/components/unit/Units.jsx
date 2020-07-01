import {fetchUnits} from '../../actions/unitActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {NewUnitContainer} from './New';

class Units extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchUnits());
  }

  render() {
    const {units} = this.props;

    if (units.length === 0) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="8" lg="6" xl="6">
              <Card className="text-center">
                <CardHeader>
                  <i className="fa fa-building-o" aria-hidden="true" />
                  Подразделений нет
                </CardHeader>
              </Card>
            </Col>
            <NewUnitContainer />
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
                Подразделения ({units.length})
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                    </tr>
                  </thead>
                  <tbody>
                    {units.map((unit) => {
                      return (
                        <tr key={unit.id}>
                          <td>
                            <Link to={`/services/lmk/unit/${unit.id}`}>
                              {unit.name}
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
          <NewUnitContainer />
        </Row>
      </div>
    );
  }
}

Units.propTypes = {
  dispatch: PropTypes.func.isRequired,
  units: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    units: state.units.units,
  };
};

export const UnitsContainer = connect(mapStateToProps)(Units);
