import {Link} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBody, Button} from 'reactstrap';
import {
  detachAuditor,
  fetchAuditors,
} from '../../../actions/audit/auditorActions';
import {TState} from '../../../reducers';
import {IUser} from '../../../interface/IUser';

interface IStateProps {
  auditors: IUser[];
  user: any;
}

interface IDispatchProps {
  fetchAuditors: typeof fetchAuditors;
  detachAuditor: typeof detachAuditor;
}

interface IProps extends IStateProps, IDispatchProps {}

class Auditors extends React.PureComponent<IProps> {
  componentDidMount() {
    const {fetchAuditors} = this.props;

    fetchAuditors();
  }

  private detachAuditor = (id: number) => {
    const {detachAuditor} = this.props;

    const result = confirm(
      'Отозвать права у аудитора? Он не сможет смотреть ваши аудиты',
    );

    if (result) {
      detachAuditor(id);
    }
  };

  render() {
    const {auditors, user} = this.props;

    if (auditors.length === 0) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="8" lg="8" xl="8">
              <Card className="text-center">
                <CardHeader>Аудиторов нет</CardHeader>
                <CardBody>
                  <Link to={'/services/audits/auditors/create'}>
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
                  to={'/services/audits/auditors/create'}
                  className="btn btn-primary btn-sm pull-right"
                >
                  Добавить <i className="icon-plus" />
                </Link>
              </CardHeader>
              <CardBody className="card-body">
                <Row
                  style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
                >
                  <Col>ФИО:</Col>
                  <Col>E-mail</Col>
                  <Col>Доступ</Col>
                </Row>
                {auditors.map((auditor) => {
                  const detachAuditor = () => this.detachAuditor(auditor.id);

                  return (
                    <Row
                      key={auditor.id}
                      style={{
                        borderTop: '1px solid #c2cfd6',
                        padding: '12px 0',
                      }}
                    >
                      <Col>
                        <Link to={`/services/profiles/${auditor.id}`}>
                          {auditor.fio}
                        </Link>
                      </Col>
                      <Col>{auditor.email}</Col>
                      <Col>
                        {user.id !== auditor.id && (
                          <Button
                            onClick={detachAuditor}
                            size="sm"
                            color="danger"
                          >
                            Отозвать доступ <i className="fa fa-trash" />
                          </Button>
                        )}
                      </Col>
                    </Row>
                  );
                })}
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
    user: state.users.currentUser,
    auditors: state.auditors.auditors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchAuditors: () => dispatch(fetchAuditors()),
    detachAuditor: (id: number) => dispatch(detachAuditor(id)),
  };
};

export const AuditorsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auditors);
