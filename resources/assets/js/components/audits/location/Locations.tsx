import React from 'react';
import {Row, Col, Card, CardHeader, CardBody, Collapse} from 'reactstrap';
import {NewLocationContainer} from './New';
import {ILocation} from '../../../interface/audit/ILocation';
import {PlacesComponent} from '../place/Places';
import {
  EmptyObjectComponent,
  ExpandComponent,
  HeaderObjectComponent,
} from '../objects/HeaderObject';

interface IProps {
  unitId: number;
  locations: ILocation[];
}

interface IState {
  collapse: boolean;
}

export class LocationsComponent extends React.PureComponent<IProps> {
  public state: IState = {
    collapse: false,
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
      <div className="animated fadeIn">
        <Row>
          <NewLocationContainer unitId={unitId} />
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Локации ({locations.length})
                <ExpandComponent collapse={collapse} toggle={this.toggle} />
              </CardHeader>
              <CardBody className="card-body" id="collapseExample">
                <Collapse isOpen={collapse}>
                  {locations.map((location) => (
                    <React.Fragment key={location.id}>
                      <HeaderObjectComponent
                        obj={location}
                        objName="Локация"
                        objUrl="location"
                      />
                      <div style={{marginLeft: '50px', marginTop: '50px'}}>
                        <PlacesComponent
                          locationId={location.id}
                          places={location.places}
                        />
                      </div>
                    </React.Fragment>
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
