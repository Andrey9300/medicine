import React from 'react';
import {connect} from 'react-redux';
import {
  fetchGroupCriterionList,
  deleteGroupCriterionList,
} from '../../../actions/audit/groupCriterionListActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {IGroupCriterion} from '../../../interface/audit/IGroupCriterion';
import {TState} from '../../../reducers';

interface IStateProps {
  groupCriterionList: IGroupCriterion;
  errors: any;
}

interface IDispatchProps {
  fetchGroupCriterionList: typeof fetchGroupCriterionList;
  deleteGroupCriterionList: typeof deleteGroupCriterionList;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  groupCriterionListId: number;
}

class GroupCriterionListList extends React.PureComponent<IProps> {
  public state: IState = {
    groupCriterionListId: null,
  };

  componentDidMount() {
    const {match, fetchGroupCriterionList} = this.props;

    this.setState({groupCriterionListId: match.params.id});
    fetchGroupCriterionList(match.params.id);
  }

  private handleBtnDelete = (id: number, event: any) => {
    event.preventDefault();
    const {deleteGroupCriterionList} = this.props;

    deleteGroupCriterionList(id);
  };

  render() {
    const {groupCriterionList, errors} = this.props;
    let errorsMessage = null;

    if (!groupCriterionList) {
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
                  to={`/services/audits/groupCriterionList/edit/${groupCriterionList.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) =>
                    this.handleBtnDelete(groupCriterionList.id, event)
                  }
                >
                  <i className="fa fa-trash" />
                </span>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Наименование:</td>
                      <td>{groupCriterionList.name}</td>
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
    groupCriterionList: state.groupCriterionLists.groupCriterionList,
    errors: state.groupCriterionLists.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchGroupCriterionList: (id: number) =>
      dispatch(fetchGroupCriterionList(id)),
    deleteGroupCriterionList: (id: number) =>
      dispatch(deleteGroupCriterionList(id)),
  };
};

export const GroupCriterionListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupCriterionListList);
