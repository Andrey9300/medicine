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
} from '../../../actions/lmk/employeeActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IEmployee} from '../../../interface/lmk/IEmployee';
import {IEmployeeResearch} from '../../../interface/lmk/IEmployeeResearch';
import {IUser} from '../../../interface/IUser';
import {TState} from '../../../reducers';
import {DateHelper} from '../../../utils/dateHelper';

interface IStateProps {
  errors: object;
  employee: IEmployee;
  employeeResearches: IEmployeeResearch[];
  user: IUser;
}

interface IDispatchProps {
  clearEmployeeResearches: typeof clearEmployeeResearches;
  fetchEmployeeResearches: typeof fetchEmployeeResearches;
  addEmployeeResearches: typeof addEmployeeResearches;
}

interface IProps extends IStateProps, IDispatchProps {
  idEmployee: number;
}

interface IState {
  employeeId: number;
  needForPrint: Map<number, number>;
}

class EmployeeResearchesComponent extends React.PureComponent<IProps, IState> {
  public state: IState = {
    employeeId: null,
    needForPrint: new Map(),
  };

  componentDidMount() {
    const {
      clearEmployeeResearches,
      fetchEmployeeResearches,
      idEmployee,
    } = this.props;

    this.setState({
      employeeId: idEmployee,
      needForPrint: new Map(),
    });

    clearEmployeeResearches();
    fetchEmployeeResearches(idEmployee);
  }

  getButtons() {
    const {employeeId, needForPrint} = this.state;

    return (
      <>
        <Link
          to={{
            pathname: `/services/lmk/employees/print/${employeeId}`,
            state: needForPrint,
          }}
          className="btn btn-secondary btn-sm pull-left"
          style={{marginRight: '16px'}}
        >
          <i className="fa fa-dot-circle-o" /> Направление
        </Link>
        <Button type="submit" size="sm" color="success pull-right">
          <i className="fa fa-dot-circle-o" /> Сохранить
        </Button>
      </>
    );
  }

  addToResearch(event: any) {
    const {needForPrint} = this.state;

    needForPrint.set(event.target.value, event.target.checked);
  }

  submitForm = (e: any) => {
    e.preventDefault();
    const {employeeId} = this.state;
    const {addEmployeeResearches} = this.props;
    addEmployeeResearches(document.querySelector('form'), employeeId);

    return false;
  };

  render() {
    const {employeeResearches, errors, employee} = this.props;
    let errorsMessage = null;

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
              <Form id="employeeResearch" onSubmit={this.submitForm}>
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
                      <Link to={'/services/lmk/researches'}>исследований.</Link>
                    </div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    {this.getButtons()}
                  </div>
                </CardHeader>
                <CardBody className="card-body">
                  <Table style={{border: '1px solid #c2cfd6'}} responsive>
                    <thead>
                      <tr>
                        <th>Исследование</th>
                        <th>Дата</th>
                        <th style={{borderRight: '1px solid #c2cfd6'}}>
                          Добавить в текущее напраление
                        </th>
                        <th>Отвод</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeResearches.map((employeeResearch) => {
                        const isResearchesEnds = Object.values(
                          employee.researches_ends,
                        ).find(
                          (item: any) =>
                            item.id === employeeResearch.research.id &&
                            !employeeResearch.is_exception,
                        );
                        const isResearchesExpired = Object.values(
                          employee.researches_expired,
                        ).find(
                          (item: any) =>
                            item.id === employeeResearch.research.id &&
                            !employeeResearch.is_exception,
                        );

                        const border =
                          isResearchesEnds || isResearchesExpired
                            ? '1px solid red'
                            : '';

                        return (
                          <tr key={employeeResearch.id}>
                            <td>
                              <div style={{fontSize: '14px', fontWeight: 600}}>
                                {employeeResearch.research.name}
                              </div>
                              <div
                                style={{
                                  fontSize: '12px',
                                  fontStyle: 'italic',
                                  lineHeight: '24px',
                                  fontWeight: 300,
                                }}
                              >
                                {employeeResearch.research.description}
                              </div>
                            </td>
                            <td>
                              <Input
                                type="date"
                                min="1900-01-01"
                                max={`${DateHelper.getYear()}-0${DateHelper.getMonth() + 1}-0${DateHelper.getDate()}`}
                                name={`employeeResearch[${employeeResearch.pivot.id}]`}
                                defaultValue={employeeResearch.date}
                                style={{border, minWidth: '125px'}}
                              />
                            </td>
                            <td
                              style={{
                                textAlign: 'center',
                                borderRight: '1px solid #c2cfd6',
                              }}
                            >
                              <Input
                                type="checkbox"
                                name={`is_current_research[${employeeResearch.research.id}]`}
                                value={employeeResearch.research.id}
                                onChange={addToResearch}
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  margin: 0,
                                }}
                              />
                            </td>
                            <td style={{textAlign: 'center'}}>
                              <Input
                                type="checkbox"
                                name={`is_exception[${employeeResearch.pivot.id}]`}
                                defaultChecked={employeeResearch.is_exception}
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  margin: 0,
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
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
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState): IStateProps => {
  return {
    errors: state.employees.errors,
    employee: state.employees.employee,
    employeeResearches: state.employees.employeeResearches,
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearEmployeeResearches: () => dispatch(clearEmployeeResearches()),
    fetchEmployeeResearches: (id: number) =>
      dispatch(fetchEmployeeResearches(id)),
    addEmployeeResearches: (
      formElement: HTMLFormElement = null,
      employeeId: number,
    ) => dispatch(addEmployeeResearches(formElement, employeeId)),
  };
};

export const EmployeeResearches = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeResearchesComponent);
