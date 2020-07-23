import {fetchGroupCriterionLists} from '../../../actions/audit/groupCriterionListActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {NewGroupCriterionListContainer} from './New';
import {TState} from '../../../reducers';
import {IGroupCriterion} from '../../../interface/audit/IGroupCriterion';

interface IStateProps {
  groupCriterionLists: IGroupCriterion[];
}

interface IDispatchProps {
  fetchGroupCriterionLists: typeof fetchGroupCriterionLists;
}

interface IProps extends IStateProps, IDispatchProps {}

class GroupCriterionListList extends React.PureComponent<IProps> {
  componentDidMount() {
    const {fetchGroupCriterionLists} = this.props;

    fetchGroupCriterionLists();
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
                Группы критериев ({groupCriterionLists.length})
              </CardHeader>
              <CardBody className="card-body">
                <Row
                  style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
                >
                  <Col>Наименование</Col>
                </Row>
                {groupCriterionLists.map((groupCriterionList) => (
                  <Row
                    key={groupCriterionList.id}
                    style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
                  >
                    <Col>
                      <Link
                        to={`/services/audits/groupCriterionList/${groupCriterionList.id}`}
                      >
                        {groupCriterionList.name}
                      </Link>
                    </Col>
                  </Row>
                ))}
              </CardBody>
            </Card>
          </Col>
          <NewGroupCriterionListContainer />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    groupCriterionLists: state.groupCriterionLists.groupCriterionLists,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchGroupCriterionLists: () => dispatch(fetchGroupCriterionLists()),
  };
};

export const GroupCriterionListsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupCriterionListList);
