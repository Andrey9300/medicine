import {fetchGroupCriterionLists} from '../../actions/groupCriterionListActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {NewGroupCriterionListContainer} from './New';

class GroupCriterionListList extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchGroupCriterionLists());
  }

  render() {
    const {groupCriterionLists} = this.props;

    if (groupCriterionLists.length === 0) {
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
            <NewGroupCriterionListContainer />
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
                Группа критериев ({groupCriterionLists.length})
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupCriterionLists.map((groupCriterionList) => {
                      return (
                        <tr key={groupCriterionList.id}>
                          <td>
                            <Link to={`/lmk/groupCriterionList/${groupCriterionList.id}`}>
                              {groupCriterionList.name}
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
          <NewGroupCriterionListContainer />
        </Row>
      </div>
    );
  }
}

GroupCriterionListList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  groupCriterionLists: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    groupCriterionLists: state.groupCriterionLists.groupCriterionLists,
  };
};

export const GroupCriterionListsContainer = connect(mapStateToProps)(GroupCriterionListList);
