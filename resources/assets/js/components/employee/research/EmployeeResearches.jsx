import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
  Table,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Input,
  CardFooter,
} from 'reactstrap';
import {
  addEmployeeResearches,
  clearEmployeeResearches,
  fetchEmployeeResearches,
} from '../../../actions/employeeActions';
import {createMarkup} from '../../../utils/errorsHelper';

class EmployeeResearches extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: props.idEmployee,
      needVga: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(clearEmployeeResearches());
    this.props.dispatch(fetchEmployeeResearches(this.state.employeeId));
  }

  handleClick() {
    // TODO: валидация на клиенте
    this.props.dispatch(
      addEmployeeResearches(
        document.querySelector('form'),
        this.state.employeeId,
      ),
    );
  }

  getButtons() {
    const {employeeId, needVga} = this.state;
    const params = needVga ? '?needVga=1' : '';

    return (
      <>
        <Link
          to={`/employees/print/${employeeId}${params}`}
          className="btn btn-secondary btn-sm pull-left"
          style={{marginRight: '16px'}}
        >
          <i className="fa fa-dot-circle-o" /> Направление
        </Link>
        <Button
          type="submit"
          size="sm"
          color="success pull-right"
          onClick={this.handleClick}
        >
          <i className="fa fa-dot-circle-o" /> Сохранить
        </Button>
      </>
    );
  }

  addToResearch() {
    const {needVga} = this.state;
    this.setState({needVga: !needVga});
  }

  render() {
    const {employeeResearches, errors, employee} = this.props;
    let errorsMessage = '';

    if (!employeeResearches) {
      return null;
    }

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }
    const addToResearch = this.addToResearch.bind(this);

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="12" lg="8">
            <Card>
              <CardHeader
                style={{display: 'flex', justifyContent: 'space-between'}}
              >
                <div>
                  <div>
                    <i className="fa fa-heartbeat" aria-hidden="true" />
                    &nbsp;Даты исследований ({employeeResearches.length})
                  </div>
                  <div>
                    Список всех доступных{' '}
                    <Link to={'/researches'}>исследований.</Link>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {this.getButtons()}
                </div>
              </CardHeader>
              <CardBody className="card-body">
                <Form id="employeeResearch">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Исследование</th>
                        <th>Дата</th>
                        <th>Отвод</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeResearches.map((employeeResearch) => {
                        const isResearchesEnds = Object.values(
                          employee.researches_ends,
                        ).find(
                          (item) =>
                            item.id === employeeResearch.research.id &&
                            !employeeResearch.is_exception,
                        );
                        const isResearchesExpired = Object.values(
                          employee.researches_expired,
                        ).find(
                          (item) =>
                            item.id === employeeResearch.research.id &&
                            !employeeResearch.is_exception,
                        );

                        const border =
                          isResearchesEnds || isResearchesExpired
                            ? '1px solid red'
                            : {};

                        let needVga = null;

                        if (employeeResearch.research.id === 20) {
                          needVga = (
                            <span>
                              Включить в направление{' '}
                              <input
                                type="checkbox"
                                name={`needVga`}
                                onChange={addToResearch}
                              />
                            </span>
                          );
                        }

                        return (
                          <tr key={employeeResearch.id}>
                            <td>
                              <div
                                style={{fontSize: '14px', fontWeight: '600'}}
                              >
                                {employeeResearch.research.name}
                              </div>
                              {needVga}
                              <div
                                style={{
                                  fontSize: '12px',
                                  fontStyle: 'italic',
                                  lineHeight: '24px',
                                  fontWeight: '300',
                                }}
                              >
                                {employeeResearch.research.description}
                              </div>
                            </td>
                            <td>
                              <Input
                                type="text"
                                placeholder="дд-мм-гггг"
                                name={`employeeResearch[${employeeResearch.pivot.id}]`}
                                defaultValue={employeeResearch.date}
                                style={{border, minWidth: '125px'}}
                              />
                            </td>
                            <td style={{textAlign: 'center'}}>
                              <Input
                                type="checkbox"
                                name={`is_exception[${employeeResearch.pivot.id}]`}
                                defaultChecked={employeeResearch.is_exception}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Form>
              </CardBody>
              <CardFooter>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  {this.getButtons()}
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

EmployeeResearches.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.employees.errors,
    employee: state.employees.employee,
    employeeResearches: state.employees.employeeResearches,
    user: state.users.user,
  };
};

export default connect(mapStateToProps)(EmployeeResearches);
