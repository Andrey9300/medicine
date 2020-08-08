import React from 'react';
import {
  fetchPestLocation,
  deletePestLocation,
  clearPestLocation,
} from '../../actions/pest/locationActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';
import {IPestLocation} from '../../interface/pest/IPestLocation';

interface IPestLocationStateProps {
  pestLocation: IPestLocation;
  fetched?: boolean;
  errors?: any;
}

export interface IPestLocationDispatchProps {
  clearPestLocation?: typeof clearPestLocation;
  fetchPestLocation?: typeof fetchPestLocation;
  deletePestLocation?: typeof deletePestLocation;
}

interface IPestLocationProps
  extends IPestLocationStateProps,
    IPestLocationDispatchProps {
  match?: any;
}

export class PestLocationComponent extends React.PureComponent<
  IPestLocationProps
> {
  componentDidMount() {
    const {clearPestLocation, fetchPestLocation, match} = this.props;

    if (!match) {
      return;
    }

    clearPestLocation();
    fetchPestLocation(match.params.id);
  }

  handleBtnDelete = (id: number, event: any) => {
    event.preventDefault();
    const {deletePestLocation} = this.props;

    const result = confirm(
      'Удаление приведет к потере данных локации. Удалить?',
    );

    if (result) {
      deletePestLocation(id);
    }
  };

  render() {
    const {pestLocation, errors} = this.props;
    let errorsMessage = null;

    if (!pestLocation) {
      return null;
    }

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <Row>
        <Col xs="12" sm="12" md="8" lg="8" xl="8">
          <Card>
            {errorsMessage}
            <CardHeader>
              <i className="fa fa-building-o" aria-hidden="true" />
              Помещение
              <Link
                to={`/services/pests/pestLocation/edit/${pestLocation.id}`}
                style={{
                  marginLeft: '18px',
                }}
              >
                <i className="fa fa-pencil" />
              </Link>
              <span
                className="pull-right"
                onClick={(event) =>
                  this.handleBtnDelete(pestLocation.id, event)
                }
              >
                <i className="fa fa-trash" />
              </span>
            </CardHeader>
            <CardBody className="card-body">
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Подразделение:</Col>
                <Col>{pestLocation.name}</Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
