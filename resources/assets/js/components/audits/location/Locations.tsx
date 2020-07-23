import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Collapse} from 'reactstrap';
import {NewLocationContainer} from './New';
import {ILocation} from '../../../interface/audit/ILocation';
import {PlacesComponent} from '../place/Places';
import {EmptyObjectComponent, ExpandComponent} from '../objects/HeaderObject';
import {NewPlaceContainer} from '../place/New';

interface IProps {
  unitId: number;
  locations: ILocation[];
}

interface IState {
  collapse: boolean;
}

export class LocationsComponent extends React.PureComponent<IProps> {
  public state: IState = {
    collapse: true,
  };

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  render() {
    const {collapse} = this.state;
    const {unitId, locations} = this.props;

    if (locations.length === 0) {
      return (
        <>
          <EmptyObjectComponent objName="Локаций" />
          <NewLocationContainer unitId={unitId} />
        </>
      );
    }

    return (
      <Card>
        <CardHeader>
          <i className="fa fa-building-o" aria-hidden="true" />
          Локации ({locations.length})
          <ExpandComponent collapse={collapse} toggle={this.toggle} />
        </CardHeader>
        <Collapse isOpen={collapse}>
          <CardBody className="card-body" id="collapseExample">
            {locations.map((location, index) => (
              <Row
                key={`${location.id}${index}`}
                style={{borderBottom: '1px solid #c2cfd6', marginBottom: '8px'}}
              >
                <Col xs="2">
                  <Link to={`/services/audits/location/${location.id}`}>
                    {location.name}
                  </Link>
                </Col>
                <Col xs="10">
                  <Row>
                    <Col xs="12">
                      <PlacesComponent
                        locationId={location.id}
                        places={location.places}
                      />
                    </Col>
                  </Row>
                  {location.places.length > 0 && (
                    <Row>
                      <Col xs="12" style={{marginBottom: '8px'}}>
                        <NewPlaceContainer locationId={location.id} />
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            ))}
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}
