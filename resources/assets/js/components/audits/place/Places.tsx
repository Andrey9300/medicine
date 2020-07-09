import React from 'react';
import {Row, Col, Card, CardHeader, CardBody, Collapse} from 'reactstrap';
import {NewPlaceContainer} from './New';
import {IPlace} from '../../../interface/audit/IPlace';
import {
  EmptyObjectComponent,
  ExpandComponent,
  HeaderObjectComponent,
} from '../objects/HeaderObject';
import {NewLocationContainer} from '../location/New';

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
        <>
          <EmptyObjectComponent objName="Помещений" />
          <NewPlaceContainer locationId={locationId} />
        </>
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <NewPlaceContainer locationId={locationId} />
        </Row>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Помещения ({places.length})
                <ExpandComponent collapse={collapse} toggle={this.toggle} />
              </CardHeader>
              <CardBody className="card-body">
                <Collapse isOpen={collapse}>
                  {places.map((place) => (
                    <HeaderObjectComponent
                      obj={place}
                      objName="Место"
                      objUrl="place"
                    />
                  ))}
                </Collapse>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
