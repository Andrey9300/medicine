import React from 'react';
import {Card, CardHeader, CardBody, Collapse} from 'reactstrap';
import {NewPestLocationContainer} from './New';
import {IPestLocation} from '../../interface/pest/IPestLocation';

interface IProps {
  locationId: number;
  pestLocations: IPestLocation[];
}

interface IState {
  collapse: boolean;
}

export class PestLocationsComponent extends React.PureComponent<IProps> {
  public state: IState = {
    collapse: true,
  };

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  render() {
    const {collapse} = this.state;
    const {locationId, pestLocations} = this.props;

    if (!pestLocations || pestLocations.length === 0) {
      return (
        <div style={{marginBottom: '8px'}}>
          <NewPestLocationContainer locationId={locationId} />
        </div>
      );
    }

    return (
      <Card>
        <CardHeader>
          <i className="fa fa-building-o" aria-hidden="true" />
          Помещения ({pestLocations.length})
        </CardHeader>
        <Collapse isOpen={collapse}>
          <CardBody className="card-body" />
        </Collapse>
      </Card>
    );
  }
}
