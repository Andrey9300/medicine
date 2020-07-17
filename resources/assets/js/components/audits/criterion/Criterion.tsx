import React from 'react';
import {connect} from 'react-redux';
import {
  fetchCriterion,
  deleteCriterion,
} from '../../../actions/audit/criterionActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {ICriterion} from '../../../interface/audit/ICriterion';
import {TState} from '../../../reducers';

interface IStateProps {
  criterion: ICriterion;
  errors: any;
}

interface IDispatchProps {
  fetchCriterion: typeof fetchCriterion;
  deleteCriterion: typeof deleteCriterion;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  criterionId: number;
}

class Criterion extends React.PureComponent<IProps> {
  public state: IState = {
    criterionId: null,
  };

  componentDidMount() {
    const {match, fetchCriterion} = this.props;

    fetchCriterion(match.params.id);

    this.setState({criterionId: match.params.id});
  }

  handleBtnDelete = (id: number, event: any) => {
    event.preventDefault();
    const {deleteCriterion} = this.props;

    deleteCriterion(id);
  };

  render() {
    const {criterion, errors} = this.props;
    let errorsMessage = null;

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
                <Row
                  style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
                >
                  <Col xs="2">Наименование</Col>
                  <Col xs="10">{criterion.name}</Col>
                </Row>
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
    criterion: state.criterions.criterion,
    errors: state.criterions.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchCriterion: (id: number) => dispatch(fetchCriterion(id)),
    deleteCriterion: (id: number) => dispatch(deleteCriterion(id)),
  };
};

export const CriterionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Criterion);
