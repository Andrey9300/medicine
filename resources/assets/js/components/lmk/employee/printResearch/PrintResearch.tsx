import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {
  fetchEmployee,
  fetchEmployeeResearches,
  sendToResearch,
  clearEmployee,
  clearEmployeeResearches,
} from '../../../../actions/lmk/employeeActions';
import {Link} from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Button,
} from 'reactstrap';
import {fetchHospitals} from '../../../../actions/lmk/hospitalActions';
import {fetchOrganization} from '../../../../actions/lmk/organizationActions';
import {createMarkup} from '../../../../utils/errorsHelper';
import {TState} from '../../../../reducers';
import {IEmployee} from '../../../../interface/lmk/IEmployee';
import {IHospital} from '../../../../interface/lmk/IHospital';
import {IOrganization} from '../../../../interface/lmk/IOrganization';
import {IEmployeeResearch} from '../../../../interface/lmk/IEmployeeResearch';
import {DateHelper} from '../../../../utils/dateHelper';
import {HospitalInfo} from './HospitalInfo';
import {EmployeeInfo, EmployeeInfoAdditional, HeadInfo} from './EmployeeInfo';
import {LmkInfo, MedCheck, PassedTo, PsychiatricCheck} from './CustomFields';
import {SendFrom} from './OrganizationInfo';
import {ResearchesPrint} from './ResearchesPrint';

interface IStateProps {
  employee: IEmployee;
  hospital: IHospital[];
  hospitalFetched: boolean;
  employeeResearches: IEmployeeResearch[];
  organization: IOrganization;
}

interface IDispatchProps {
  clearEmployeeResearches: typeof clearEmployeeResearches;
  clearEmployee: typeof clearEmployee;
  fetchEmployeeResearches: typeof fetchEmployeeResearches;
  fetchEmployee: typeof fetchEmployee;
  fetchHospitals: typeof fetchHospitals;
  fetchOrganization: typeof fetchOrganization;
  sendToResearch: typeof sendToResearch;
}

interface IProps extends IStateProps, IDispatchProps, RouteComponentProps {}

interface IState {
  errors: any;
  employeeId: number;
  needForResearch: any;
}

class PrintEmployeeComponent extends React.PureComponent<IProps, IState> {
  public state: IState = {
    errors: null,
    employeeId: null,
    needForResearch: null,
  };

  componentDidMount() {
    const {
      clearEmployeeResearches,
      clearEmployee,
      fetchEmployeeResearches,
      fetchEmployee,
      fetchHospitals,
      match,
      location: {state},
    } = this.props;
    const params = match.params as any;
    const employeeId = params.id;

    clearEmployeeResearches();
    clearEmployee();

    fetchEmployeeResearches(employeeId);
    fetchEmployee(employeeId);
    fetchHospitals();

    this.setState({
      errors: null,
      employeeId,
      needForResearch: state,
    });
  }

  componentDidUpdate(prevProps: IProps) {
    const {employee, fetchOrganization} = this.props;

    if (prevProps.employee !== employee && employee && employee.organization) {
      fetchOrganization(employee.organization.id);
    }
  }

  sendToResearch = () => {
    const {employeeId} = this.state;
    const {sendToResearch} = this.props;

    sendToResearch(employeeId);
  }

  getButtons() {
    const {employee} = this.props;

    return (
      <div style={{display: 'flex'}}>
        <Link
          to="#"
          className="btn btn-primary btn-sm pull-left"
          style={{
            color: '#fff',
          }}
          onClick={window.print}
        >
          Печать <i className="icon-printer" />
        </Link>
        <Button
          type="submit"
          size="sm"
          color="success pull-right"
          onClick={this.sendToResearch}
          style={{marginLeft: '24px'}}
          disabled={employee.send_to_research ? true : false}
        >
          <i className="fa fa-dot-circle-o" />{' '}
          {employee.send_to_research ? 'Отправлен на МО' : 'Отправить на МО'}
        </Button>
      </div>
    );
  }

  needHospital() {
    return (
      <Card>
        <CardHeader>
          <i className="fa fa-dot-circle-o" aria-hidden="true" />
          Что-то пошло не так
        </CardHeader>
        <CardBody className="card-body">
          Возможно нужно добавить{' '}
          <Link to={'/services/lmk/hospitals'}>медицинское учреждение.</Link>
        </CardBody>
      </Card>
    );
  }

  showError() {
    const {errors} = this.state;

    if (!errors) {
      return null;
    }

    return (
      <div className="alert alert-danger" role="alert">
        {createMarkup(errors)}
      </div>
    );
  }

  render() {
    const {needForResearch} = this.state;
    const {
      organization,
      employee,
      hospital,
      hospitalFetched,
      employeeResearches,
    } = this.props;
    const hospitalOrg = hospital[0]; // Пока одна мед организация

    if (!hospitalOrg && hospitalFetched) {
      return this.needHospital();
    }

    if (!employee || !hospitalOrg || !organization) {
      return null;
    }

    return (
      <div>
        {this.showError()}
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="12" md="12">
              <Card>
                <CardHeader className="d-print-none not-print">
                  {this.getButtons()}
                </CardHeader>
                <CardBody className="card-body">
                  <Table
                    responsive
                    id="printResearches"
                    style={{fontSize: '12px'}}
                  >
                    <tbody>
                      <HeadInfo
                        employee={employee}
                        photoMap={hospitalOrg.photo_map}
                      />
                      <EmployeeInfo employee={employee} />
                      <HospitalInfo hospital={hospitalOrg} />
                      <LmkInfo />
                      <tr>
                        <td colSpan={2}>Категория: {employee.category.name}</td>
                      </tr>
                      <ResearchesPrint
                        employee={employee}
                        needForResearch={needForResearch}
                        employeeResearches={employeeResearches}
                      />
                      <MedCheck />
                      <EmployeeInfoAdditional employee={employee} />
                      <PsychiatricCheck />
                      <PassedTo />
                      <SendFrom organization={organization} />
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter className="not-print">
                  {this.getButtons()}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: TState): IStateProps => {
  return {
    employee: state.employees.employee,
    hospital: state.hospitals.hospitals,
    hospitalFetched: state.hospitals.fetched,
    employeeResearches: state.employees.employeeResearches,
    organization: state.organizations.organization,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearEmployeeResearches: () => dispatch(clearEmployeeResearches()),
    clearEmployee: () => dispatch(clearEmployee()),
    fetchEmployeeResearches: (id: number) =>
      dispatch(fetchEmployeeResearches(id)),
    fetchEmployee: (id: number) => dispatch(fetchEmployee(id)),
    fetchHospitals: () => dispatch(fetchHospitals()),
    fetchOrganization: (id: number) => dispatch(fetchOrganization(id)),
    sendToResearch: (id: number) => dispatch(sendToResearch(id)),
  };
};

export const PrintEmployee = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrintEmployeeComponent);
