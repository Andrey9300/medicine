import React from 'react';
import {connect} from 'react-redux';
import {
  fetchGroupCriterion,
  deleteGroupCriterion,
} from './../../actions/groupCriterionActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

class GroupCriterion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      groupCriterionId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchGroupCriterion(this.state.groupCriterionId));
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deleteGroupCriterion(id));
  }

  render() {
    const {groupCriterion, errors} = this.props;
    let errorsMessage = '';

    if (!groupCriterion) {
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
                  to={`/lmk/groupCriterions/edit/${groupCriterion.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) => this.handleBtnDelete(groupCriterion.id, event)}
                >
                  <i className="fa fa-trash" />
                </span>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Наименование:</td>
                      <td>{groupCriterion.name}</td>
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

GroupCriterion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    groupCriterion: state.groupCriterions.groupCriterion,
    fetched: state.groupCriterions.fetched,
    errors: state.groupCriterions.errors,
  };
};

export const GroupCriterionContainer = connect(mapStateToProps)(GroupCriterion);
