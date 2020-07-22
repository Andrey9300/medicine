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

export interface IStateProps {
  criterions: ICriterion[];
}

export interface IDispatchProps {
  fetchCriterions?: typeof fetchCriterions;
}

export interface IProps extends IStateProps, IDispatchProps {
  needNewContainer: boolean;
}

interface IState {
  collapse: boolean;
}

export class Criterions extends React.PureComponent<IProps> {
  public state: IState = {
    collapse: true,
  };

  public static defaultProps: Pick<IProps, 'needNewContainer'> = {
    needNewContainer: true,
  }

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  componentDidMount() {
    const {fetchCriterions} = this.props;

    if (fetchCriterions) {
      fetchCriterions();
    }
  }

  render() {
    const {collapse} = this.state;
    const {criterions, needNewContainer} = this.props;

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
          {needNewContainer && <NewCriterionContainer />}
        </Row>
      </div>
    );
  }
}