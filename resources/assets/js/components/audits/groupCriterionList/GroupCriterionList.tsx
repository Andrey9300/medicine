import React from 'react';
import {connect} from 'react-redux';
import {
  fetchGroupCriterionList,
  deleteGroupCriterionList,
} from '../../../actions/audit/groupCriterionListActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {IGroupCriterionList} from '../../../interface/audit/IGroupCriterion';
import {TState} from '../../../reducers';
import {ICriterion} from '../../../interface/audit/ICriterion';
import {Criterions} from "../criterion/Criterions";

interface IStateProps {
  criterions: ICriterion[];
  groupCriterionList: IGroupCriterionList;
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


    const result = confirm(
        'Удаление приведет к потере данных в аудите связанным с этой группой чек-листов. Удалить?',
    );

    if (result) {
      deleteGroupCriterionList(id);
    }
  };

  render() {
    const {criterions, groupCriterionList, errors} = this.props;
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
          <Col xs="12" sm="12" md="8" lg="6" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Группа критериев
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
                <Row
                  style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
                >
                  <Col>Наименование</Col>
                  <Col>{groupCriterionList.name}</Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Criterions criterions={criterions} needNewContainer={false} />
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    criterions: state.groupCriterionLists.criterions,
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
