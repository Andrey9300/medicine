import React from 'react';
import {connect} from 'react-redux';
import {
  fetchCriterionList,
  deleteCriterionList,
} from '../../actions/audit/criterionListActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

class CriterionList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      criterionListId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchCriterionList(this.state.criterionListId));
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deleteCriterionList(id));
  }

  render() {
    const {criterionList, errors} = this.props;
    let errorsMessage = '';

    if (!criterionList) {
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
                  to={`/services/audits/criterionLists/edit/${criterionList.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) => this.handleBtnDelete(criterionList.id, event)}
                >
                  <i className="fa fa-trash" />
                </span>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Наименование:</td>
                      <td>{criterionList.name}</td>
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

CriterionList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    criterionList: state.criterionLists.criterionList,
    fetched: state.criterionLists.fetched,
    errors: state.criterionLists.errors,
  };
};

export const CriterionListContainer = connect(mapStateToProps)(CriterionList);
