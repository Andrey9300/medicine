import {fetchUnits} from '../../../actions/audit/unitActions';
import React from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Collapse,
} from 'reactstrap';
import {NewUnitContainer} from './New';
import {TState} from '../../../reducers';
import {IUnit} from '../../../interface/audit/IUnit';
import {LocationsComponent} from '../location/Locations';
import {
  EmptyObjectComponent,
  ExpandComponent,
  HeaderObjectComponent,
} from '../objects/HeaderObject';

interface IStateProps {
  units: IUnit[];
}

interface IDispatchProps {
  fetchUnits: typeof fetchUnits;
}

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
  collapse: boolean;
}

class UnitsComponent extends React.PureComponent<IProps> {
  public state: IState = {
    collapse: false,
  };

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  componentDidMount() {
    const {fetchUnits} = this.props;

    fetchUnits();
  }

  render() {
    const {collapse} = this.state;
    const {units} = this.props;

    if (units.length === 0) {
      return (
        <Row>
          <EmptyObjectComponent objName="Подразделений" />
          <NewUnitContainer />
        </Row>
      );
    }

    return (
      <Row>
        <Col>
          <Card>
            <Row>
              <NewUnitContainer />
            </Row>
            <CardHeader>
              <i className="fa fa-building-o" aria-hidden="true" />
              Подразделения ({units.length})
              <ExpandComponent collapse={collapse} toggle={this.toggle} />
            </CardHeader>
            <CardBody className="card-body">
              <Collapse isOpen={collapse}>
                {units.map((unit, index) => (
                  <React.Fragment key={`${unit.id}${index}`}>
                    <HeaderObjectComponent
                      obj={unit}
                      objName="Подразделение"
                      objUrl="unit"
                    />
                    <div style={{marginLeft: '50px', marginTop: '50px'}}>
                      <LocationsComponent
                        unitId={unit.id}
                        locations={unit.locations}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </Collapse>
            </CardBody>
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
  };
};

export const UnitsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnitsComponent);
