import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody, Row, Col, Collapse} from 'reactstrap';

import {IPestControl} from '../../../interface/pest/IPestControl';
import {fetchPestControlsForLocation} from '../../../actions/pest/controlActions';
import {NewPestControlContainer} from './New';
import {ExpandComponent} from '../../audits/objects/HeaderObject';

interface IPestControlsStateProps {
  pestControls: IPestControl[];
  fetched?: boolean;
  errors?: any;
}

interface IState {
  collapse: boolean;
}

export interface IPestControlsDispatchProps {
  fetchPestControlsForLocation?: typeof fetchPestControlsForLocation;
}

interface IPestControlsProps
  extends IPestControlsStateProps,
    IPestControlsDispatchProps {
  locationId: number;
}

export class PestControlsComponent extends React.PureComponent<
  IPestControlsProps
> {
  public state: IState = {
    collapse: true,
  };

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  componentDidMount() {
    const {fetchPestControlsForLocation, locationId} = this.props;

    fetchPestControlsForLocation(locationId);
  }

  render() {
    const {collapse} = this.state;
    const {pestControls, locationId} = this.props;

    if (!pestControls || pestControls.length === 0) {
      return <NewPestControlContainer locationId={locationId} />;
    }

    return (
      <>
        <Card>
          <CardHeader>
            <i className="fa fa-list" aria-hidden="true" />
            Листы контроля ({pestControls.length})
            <ExpandComponent collapse={collapse} toggle={this.toggle} />
          </CardHeader>
          <Collapse isOpen={collapse}>
            <CardBody className="card-body">
              <Row
                style={{
                  borderBottom: '1px solid #c2cfd6',
                  marginBottom: '8px',
                  paddingBottom: '8px',
                }}
              >
                <Col xs="2">Дата</Col>
              </Row>
              {pestControls.map((pestControl, index) => (
                <Row
                  key={`${pestControl.id}${index}`}
                  style={{
                    borderBottom: '1px solid #c2cfd6',
                    marginBottom: '8px',
                    paddingBottom: '8px',
                  }}
                >
                  <Col xs="2">
                    <Link to={`/services/pest/control/${pestControl.id}`}>
                      {pestControl.created_at}
                    </Link>
                  </Col>
                </Row>
              ))}
            </CardBody>
          </Collapse>
          <NewPestControlContainer locationId={locationId} />
        </Card>
      </>
    );
  }
}
