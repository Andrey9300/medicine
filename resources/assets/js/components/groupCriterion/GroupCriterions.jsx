import {fetchGroupCriterions} from '../../actions/audit/groupCriterionActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {NewGroupCriterionContainer} from './New';

class GroupCriterions extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchGroupCriterions());
  }

  render() {
    const {groupCriterions} = this.props;

    if (groupCriterions.length === 0) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="8" lg="6" xl="6">
              <Card className="text-center">
                <CardHeader>
                  <i className="fa fa-building-o" aria-hidden="true" />
                  Названий групп критериев нет
                </CardHeader>
              </Card>
            </Col>
            <NewGroupCriterionContainer />
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
                Группа критериев ({groupCriterions.length})
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupCriterions.map((groupCriterion) => {
                      return (
                        <tr key={groupCriterion.id}>
                          <td>
                            <Link to={`/services/audits/groupCriterion/${groupCriterion.id}`}>
                              {groupCriterion.name}
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
          <NewGroupCriterionContainer />
        </Row>
      </div>
    );
  }
}

GroupCriterions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  groupCriterions: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    groupCriterions: state.groupCriterions.groupCriterions,
  };
};

export const GroupCriterionsContainer = connect(mapStateToProps)(GroupCriterions);
