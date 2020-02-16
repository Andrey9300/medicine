import {deleteHospital, fetchHospitals} from '../../actions/hospitalActions';
import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class Hospitals extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleBtnDelete = this.handleBtnDelete.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchHospitals());
  }

  handleBtnDelete(hospitalId, event) {
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
                <CardBlock>
                  <Link to={'/hospitals/create'}>Добавить медицинский центр</Link>
                </CardBlock>
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
                <i className="fa fa-stethoscope" aria-hidden="true"/>Медицинские центры ({hospitals.length})
              </CardHeader>
              <CardBlock className="card-body">
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
                            <Link to={`/hospital/${hospital.id}`}>
                              {hospital.name}
                            </Link>
                          </td>
                          <td>{hospital.address}</td>
                          <td>{hospital.head_fio}</td>
                          <td>{hospital.phone}</td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                </Table>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hospitals: state.hospitals.hospitals,
  };
};

export default connect(mapStateToProps)(Hospitals);
