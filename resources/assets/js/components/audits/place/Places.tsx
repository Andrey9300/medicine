import React from 'react';
import {Row, Col, Card, CardHeader, CardBody, Collapse} from 'reactstrap';
import {NewPlaceContainer} from './New';
import {IPlace} from '../../../interface/audit/IPlace';
import {
  EmptyObjectComponent,
  ExpandComponent,
  HeaderObjectComponent,
} from '../objects/HeaderObject';

interface IProps {
  locationId: number;
  places: IPlace[];
}

interface IState {
  collapse: boolean;
}

export class PlacesComponent extends React.PureComponent<IProps> {
  public state: IState = {
    collapse: false,
  };

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  render() {
    const {collapse} = this.state;
    const {locationId, places} = this.props;

    if (!places || places.length === 0) {
      return (
        <div style={{marginBottom: '8px'}}>
          <EmptyObjectComponent objName="Помещений" />
          <NewPlaceContainer locationId={locationId} />
        </div>
      );
    }

    return (
      <Card>
        <CardHeader>
          <i className="fa fa-building-o" aria-hidden="true" />
          Помещения ({places.length})
          <ExpandComponent collapse={collapse} toggle={this.toggle} />
        </CardHeader>
        <Collapse isOpen={collapse}>
          <CardBody className="card-body">
            {places.map((place, index) => (
              <HeaderObjectComponent key={index} obj={place} objUrl="place" />
            ))}
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}
