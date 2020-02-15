import React from 'react';
import {connect} from 'react-redux';
import {fetchHospital, deleteHospital} from './../../actions/hospitalActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class Hospital extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      hospitalId: props.match.params.id
    };
    this.handleBtnDelete = this.handleBtnDelete.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchHospital(this.state.hospitalId));
  }

  handleBtnDelete(hospitalId, event) {
    event.preventDefault();
    this.props.dispatch(deleteHospital(hospitalId));
  }

  createMarkup() {
    return {
      __html: this.state.errors
    };
  }

  render() {
    const {hospital} = this.props;
    let errors = '';

    if (hospital === null) {
      return null;
    }

    if (this.state.errors !== '') {
      errors =
        <div className="alert alert-danger" role="alert">
          <div dangerouslySetInnerHTML={this.createMarkup()}/>
        </div>;
    }

    return (
      <div>
        {errors}
        <div className="animated fadeIn">
          <Row>
            <Col xs="6" sm="6" md="6">
              <Card>
                <CardHeader>
                  <i className="fa fa-stethoscope" aria-hidden="true"/>
                  «{hospital.name}»
                  <Link to={`/hospitals/edit/${hospital.id}`} style={{
                    marginLeft: '18px'
                  }}>
                    <i className="fa fa-pencil"/>
                  </Link>
                  <span className="pull-right" onClick={(event) => this.handleBtnDelete(
                    hospital.id,
                    event
                  )}>
                    <i className="fa fa-trash"/>
                  </span>
                </CardHeader>
                <CardBlock className="card-body">
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
                        <td>Контактное лицо:</td>
                        <td>{hospital.head_fio}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBlock>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Hospital.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    hospital: state.hospitals.hospital,
  };
};

export default connect(mapStateToProps)(Hospital);
