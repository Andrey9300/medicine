import React, {PureComponent} from 'react';
import {deleteHospital, fetchHospitals} from '../../../actions/lmk/hospitalActions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {IHospital} from "../../../interface/lmk/IHospital";
import {TState} from "../../../reducers";

interface IProps {
  dispatch: any;
  match: any;
  errors: any;
  hospitals: IHospital[];
}

class Hospitals extends PureComponent<IProps> {
  componentDidMount() {
    this.props.dispatch(fetchHospitals());
  }

  handleBtnDelete = (hospitalId: number, event: any) => {
    event.preventDefault();
    this.props.dispatch(deleteHospital(hospitalId));
  }

  render() {
    const {hospitals} = this.props;

    if (!hospitals.length) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="6" md="4">
              <Card className="text-center">
                <CardHeader>Медицинских центров нет</CardHeader>
                <CardBody>
                  <Link to={'/services/lmk/hospitals/create'}>
                    Добавить медицинский центр
                  </Link>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-stethoscope" aria-hidden="true" />
                Медицинские центры ({hospitals.length})
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Название</th>
                      <th>Адрес</th>
                      <th>Контактное лицо</th>
                      <th>Телефон</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitals.map((hospital) => {
                      return (
                        <tr key={hospital.id}>
                          <td>
                            <Link to={`/services/lmk/hospital/${hospital.id}`}>
                              {hospital.name}
                            </Link>
                          </td>
                          <td>{hospital.address}</td>
                          <td>{hospital.head_fio}</td>
                          <td>{hospital.phone}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    hospitals: state.hospitals.hospitals,
  };
};

export const HospitalsContainer = connect(mapStateToProps)(Hospitals);
