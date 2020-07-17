import {fetchUnits} from '../../../actions/audit/unitActions';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBody, Collapse} from 'reactstrap';
import {NewUnitContainer} from './New';
import {TState} from '../../../reducers';
import {IUnit} from '../../../interface/audit/IUnit';
import {LocationsComponent} from '../location/Locations';
import {EmptyObjectComponent, ExpandComponent} from '../objects/HeaderObject';
import {NewLocationContainer} from '../location/New';
import {
  clearGroupCriterionList,
  fetchGroupCriterionLists,
} from '../../../actions/audit/groupCriterionListActions';

interface IStateProps {
  units: IUnit[];
}

interface IDispatchProps {
  fetchUnits: typeof fetchUnits;
  clearGroupCriterionList: typeof clearGroupCriterionList;
  fetchGroupCriterionLists: typeof fetchGroupCriterionLists;
}

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
  collapse: boolean;
}

class UnitsComponent extends React.PureComponent<IProps> {
  public state: IState = {
    collapse: true,
  };

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  componentDidMount() {
    const {
      fetchUnits,
      clearGroupCriterionList,
      fetchGroupCriterionLists,
    } = this.props;

    fetchUnits();
    clearGroupCriterionList();
    fetchGroupCriterionLists();
  }

  render() {
    const {collapse} = this.state;
    const {units} = this.props;

    if (units.length === 0) {
      return (
        <>
          <Row>
            <Col xs="6">
              <EmptyObjectComponent objName="Подразделений" />
            </Col>
          </Row>
          <Row>
            <Col xs="8">
              <Card>
                <CardBody>
                  <NewUnitContainer />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      );
    }

    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-building-o" aria-hidden="true" />
              Подразделения ({units.length})
              <ExpandComponent collapse={collapse} toggle={this.toggle} />
            </CardHeader>
            <Collapse isOpen={collapse}>
              <CardBody className="card-body">
                {units.map((unit, index) => (
                  <Row
                    key={`${unit.id}${index}`}
                    style={{
                      borderBottom: '1px solid #c2cfd6',
                      marginBottom: '8px',
                      paddingBottom: '8px',
                    }}
                  >
                    <Col xs="2">{unit.name}</Col>
                    <Col xs="10">
                      <Row>
                        <Col xs="12">
                          <LocationsComponent
                            unitId={unit.id}
                            locations={unit.locations}
                          />
                        </Col>
                      </Row>
                      {unit.locations.length > 0 && (
                        <Row>
                          <Col xs="12" style={{marginBottom: '8px'}}>
                            <NewLocationContainer unitId={unit.id} />
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                ))}
                <Row>
                  <Col xs="8">
                    <NewUnitContainer />
                  </Col>
                </Row>
              </CardBody>
            </Collapse>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state: TState): IStateProps => {
  return {
    units: state.units.units,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchUnits: () => dispatch(fetchUnits()),
    clearGroupCriterionList: () => dispatch(clearGroupCriterionList()),
    fetchGroupCriterionLists: () => dispatch(fetchGroupCriterionLists()),
  };
};

export const UnitsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnitsComponent);
