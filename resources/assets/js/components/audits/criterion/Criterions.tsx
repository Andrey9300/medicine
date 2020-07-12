import {fetchCriterions} from '../../../actions/audit/criterionActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Collapse,
} from 'reactstrap';
import {NewCriterionContainer} from './New';
import {ExpandComponent} from '../objects/HeaderObject';
import {TState} from '../../../reducers';
import {ICriterion} from '../../../interface/audit/ICriterion';

interface IStateProps {
  criterions: ICriterion[];
}

interface IDispatchProps {
  fetchCriterions: typeof fetchCriterions;
}

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
  collapse: boolean;
}

class Criterions extends React.PureComponent<IProps> {
  public state: IState = {
    collapse: true,
  };

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  componentDidMount() {
    const {fetchCriterions} = this.props;

    fetchCriterions();
  }

  render() {
    const {collapse} = this.state;
    const {criterions} = this.props;

    if (criterions.length === 0) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="8" lg="6" xl="6">
              <Card className="text-center">
                <CardHeader>
                  <i className="fa fa-building-o" aria-hidden="true" />
                  Критериев нет
                </CardHeader>
              </Card>
            </Col>
            <NewCriterionContainer />
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
                Критерии ({criterions.length})
                <ExpandComponent collapse={collapse} toggle={this.toggle} />
              </CardHeader>
              <Collapse isOpen={collapse}>
                <CardBody className="card-body">
                  {criterions.map((criterion, index) => {
                    return (
                      <FormGroup row key={index}>
                        <Col xs="12">
                          <Link
                            to={`/services/audits/criterion/${criterion.id}`}
                          >
                            {criterion.name}
                          </Link>
                        </Col>
                      </FormGroup>
                    );
                  })}
                </CardBody>
              </Collapse>
            </Card>
          </Col>
          <NewCriterionContainer />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    criterions: state.criterions.criterions,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchCriterions: () => dispatch(fetchCriterions()),
  };
};

export const CriterionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Criterions);
