import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  fetchHospital,
  deleteHospital,
} from '../../../actions/lmk/hospitalActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {IHospital} from '../../../interface/lmk/IHospital';
import {TState} from "../../../reducers";

interface IProps {
  dispatch: any;
  match: any;
  errors: any;
  hospital: IHospital;
}

interface IState {
  hospitalId: number;
}

class Hospital extends PureComponent<IProps, IState> {
  state: IState = {
    hospitalId: null,
  };

  componentDidMount() {
    const {match} = this.props;
    const hospitalId = match.params.id;

    this.setState({hospitalId});
    this.props.dispatch(fetchHospital(hospitalId));
  }

  handleBtnDelete = (hospitalId: number, event: any) => {
    event.preventDefault();
    this.props.dispatch(deleteHospital(hospitalId));
  };

  render() {
    const {hospital, errors} = this.props;
    let errorsMessage = null;

    if (!hospital) {
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
      <div>
        {errorsMessage}
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="6" md="6">
              <Card>
                <CardHeader>
                  <i className="fa fa-stethoscope" aria-hidden="true" />«
                  {hospital.name}»
                  <Link
                    to={`/services/lmk/hospitals/edit/${hospital.id}`}
                    style={{
                      marginLeft: '18px',
                    }}
                  >
                    <i className="fa fa-pencil" />
                  </Link>
                  <span
                    className="pull-right"
                    onClick={(event) =>
                      this.handleBtnDelete(hospital.id, event)
                    }
                  >
                    <i className="fa fa-trash" />
                  </span>
                </CardHeader>
                <CardBody className="card-body">
                  <Table responsive>
                    <tbody>
                      <tr>
                        <td>Адрес:</td>
                        <td>{hospital.address}</td>
                      </tr>
                      <tr>
                        <td>Расписание:</td>
                        <td>{hospital.shedule}</td>
                      </tr>
                      <tr>
                        <td>Телефон:</td>
                        <td>{hospital.phone}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{hospital.email}</td>
                      </tr>
                      <tr>
                        <td>ФИО куратора:</td>
                        <td>{hospital.head_fio}</td>
                      </tr>
                      <tr>
                        <td>Телефон куратора:</td>
                        <td>{hospital.head_phone}</td>
                      </tr>
                      <tr>
                        <td>ОГРН:</td>
                        <td>{hospital.ogrn}</td>
                      </tr>
                      <tr>
                        <td>
                          Проезд (отображение в направлении может отличаться):
                        </td>
                        <td>
                          {hospital.photo_map ? (
                            <img
                              src={`/storage/${hospital.photo_map}`}
                              style={{width: '300px', height: '150px'}}
                            />
                          ) : (
                            'Загрузите фото карты'
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    errors: state.hospitals.error,
    hospital: state.hospitals.hospital,
  };
};

export const HospitalContainer = connect(mapStateToProps)(
    Hospital,
);
