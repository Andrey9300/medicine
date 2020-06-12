import {fetchCriterions} from '../../actions/criterionActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {NewCriterionContainer} from './New';

class Criterions extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchCriterions());
  }

  render() {
    const {criterions} = this.props;

    if (criterions.length === 0) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="8" lg="6" xl="6">
              <Card className="text-center">
                <CardHeader>
                  <i className="fa fa-building-o" aria-hidden="true" />
                  Критериев нет
                </CardHeader>
              </Card>
            </Col>
            <NewCriterionContainer />
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
                Критерии ({criterions.length})
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criterions.map((criterion) => {
                      return (
                        <tr key={criterion.id}>
                          <td>
                            <Link to={`/lmk/criterion/${criterion.id}`}>
                              {criterion.name}
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
          <NewCriterionContainer />
        </Row>
      </div>
    );
  }
}

Criterions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  criterions: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    criterions: state.criterions.criterions,
  };
};

export const CriterionsContainer = connect(mapStateToProps)(Criterions);
