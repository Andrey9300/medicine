import React from 'react';
import {connect} from 'react-redux';
import {
  fetchGroupCriterionList,
  deleteGroupCriterionList,
} from './../../actions/groupCriterionListActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

class GroupCriterionListList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      groupCriterionListId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchGroupCriterionList(this.state.groupCriterionListId));
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deleteGroupCriterionList(id));
  }

  render() {
    const {groupCriterionList, errors} = this.props;
    let errorsMessage = '';

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
                  to={`/groupCriterionLists/edit/${groupCriterionList.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) => this.handleBtnDelete(groupCriterionList.id, event)}
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

GroupCriterionListList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    groupCriterionList: state.groupCriterionLists.groupCriterionList,
    fetched: state.groupCriterionLists.fetched,
    errors: state.groupCriterionLists.errors,
  };
};

export const GroupCriterionListContainer = connect(mapStateToProps)(GroupCriterionListList);
