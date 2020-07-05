import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {fetchAuditors} from '../../actions/audit/auditorActions';
import {TState} from '../../reducers';

interface IStateProps {
  auditors: any[];
}

interface IDispatchProps {
  fetchAuditors: typeof fetchAuditors;
}

interface IProps extends IStateProps, IDispatchProps {}

class Auditors extends React.PureComponent<IProps> {
  componentDidMount() {
    const {fetchAuditors} = this.props;

    fetchAuditors();
  }

  render() {
    const {auditors} = this.props;

    if (auditors.length === 0) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="8" lg="8" xl="8">
              <Card className="text-center">
                <CardHeader>Аудиторов нет</CardHeader>
                <CardBody>
                  <Link to={'/services/profiles/create'}>
                    Добавить аудитора
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
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Аудиторы ({auditors.length})
                <Link
                  to={'/services/profiles/create'}
                  className="btn btn-primary btn-sm pull-right"
                >
                  Добавить <i className="icon-plus" />
                </Link>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>ФИО</th>
                      <th>E-mail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditors.map((auditor) => {
                      return (
                        <tr key={auditor.id}>
                          <td>
                            <Link to={`/services/profiles/${auditor.id}`}>
                              {auditor.fio}
                            </Link>
                          </td>
                          <td>{auditor.email}</td>
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

const mapStateToProps = (state: TState): IStateProps => {
  return {
    auditors: state.auditors.auditors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchAuditors: () => dispatch(fetchAuditors()),
  };
};

export const AuditorsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auditors);
