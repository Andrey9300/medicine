import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody, Row, Col} from 'reactstrap';
import {NewPestLocationContainer} from './New';
import {IPestLocation} from '../../../interface/pest/IPestLocation';
import {fetchPestLocations} from '../../../actions/pest/locationActions';
import {IPestUnit} from '../../../interface/pest/IPestUnit';
import {PestUnitContainer} from '../pestUnit/PestUnitContainer';

interface IPestLocationsStateProps {
  pestUnit: IPestUnit;
  pestLocations: IPestLocation[];
  fetched?: boolean;
  errors?: any;
}

export interface IPestLocationsDispatchProps {
  fetchPestLocations?: typeof fetchPestLocations;
}

interface IPestLocationsProps
  extends IPestLocationsStateProps,
    IPestLocationsDispatchProps {
  match?: any;
}

export class PestLocationsComponent extends React.PureComponent<
  IPestLocationsProps
> {
  componentDidMount() {
    const {fetchPestLocations} = this.props;

    fetchPestLocations();
  }

  render() {
    const {pestLocations, pestUnit} = this.props;

    if (!pestLocations || pestLocations.length === 0) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="8">
              <Card>
                <CardHeader>
                  <i className="fa fa-plus" aria-hidden="true" />
                  Добавить локацию
                </CardHeader>
                <CardBody className="card-body">
                  <NewPestLocationContainer />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <PestUnitContainer />
        <Row>
          <Col xs="12" lg="8">
            {!pestUnit && (
              <Card>
                <CardBody>
                  <Link to={`/services/pest/units/create`}>
                    Добавить информацию об объекте
                  </Link>
                </CardBody>
              </Card>
            )}
            <Card>
              <CardHeader>
                <i className="fa fa-plus" aria-hidden="true" />
                Добавить локацию
              </CardHeader>
              <CardBody className="card-body">
                <NewPestLocationContainer />
              </CardBody>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Локации ({pestLocations.length})
              </CardHeader>
              <CardBody className="card-body">
                <Row
                  style={{
                    borderBottom: '1px solid #c2cfd6',
                    marginBottom: '8px',
                    paddingBottom: '8px',
                  }}
                >
                  <Col xs="2">Наименование</Col>
                </Row>
                {pestLocations.map((pestLocation, index) => (
                  <Row
                    key={`${pestLocation.id}${index}`}
                    style={{
                      borderBottom: '1px solid #c2cfd6',
                      marginBottom: '8px',
                      paddingBottom: '8px',
                    }}
                  >
                    <Col xs="2">
                      <Link to={`/services/pest/locations/${pestLocation.id}`}>
                        {pestLocation.name}
                      </Link>
                    </Col>
                  </Row>
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
