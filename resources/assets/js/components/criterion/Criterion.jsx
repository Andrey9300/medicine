import React from 'react';
import {connect} from 'react-redux';
import {
  fetchCriterion,
  deleteCriterion,
} from '../../actions/criterionActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

class Criterion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      criterionId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchCriterion(this.state.criterionId));
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deleteCriterion(id));
  }

  render() {
    const {criterion, errors} = this.props;
    let errorsMessage = '';

    if (!criterion) {
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
                  to={`/services/audits/criterions/edit/${criterion.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) => this.handleBtnDelete(criterion.id, event)}
                >
                  <i className="fa fa-trash" />
                </span>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Наименование:</td>
                      <td>{criterion.name}</td>
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

Criterion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    criterion: state.criterions.criterion,
    fetched: state.criterions.fetched,
    errors: state.criterions.errors,
  };
};

export const CriterionContainer = connect(mapStateToProps)(Criterion);
