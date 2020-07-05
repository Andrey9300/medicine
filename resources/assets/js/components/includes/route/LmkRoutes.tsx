import React from 'react';
import {Route} from 'react-router-dom';

import EditHospital from '../../lmk/hospital/Edit';
import Hospital from '../../lmk/hospital/Hospital';
import Hospitals from '../../lmk/hospital/Hospitals';
import NewHospital from '../../lmk/hospital/New';
import HospitalResearches from '../../lmk/hospital/research/HospitalResearches';
import EditOrganization from '../../lmk/organization/Edit';
import {OrganizationContainer} from '../../lmk/organization/Organization';
import {OrganizationsContainer} from '../../lmk/organization/Organizations';
import {NewOrganizationContainer} from '../../lmk/organization/New';
import OrganizationEmployees from '../../lmk/organization/OrganizationEmployees';
import OrganizationBudget from '../../lmk/organization/budget/Budget';
import EditResearch from '../../lmk/research/Edit';
import Researches from '../../lmk/research/Researches';
import NewResearch from '../../lmk/research/New';
import EditEmployee from '../../lmk/employee/Edit';
import {PrintEmployee} from '../../lmk/employee/printResearch/PrintResearch';
import Employee from '../../lmk/employee/Employee';
import {Employees} from '../../lmk/employee/Employees';
import EmployeesDeleted from '../../lmk/employee/EmployeesDeleted';
import NewEmployee from '../../lmk/employee/New';
import {EmployeeResearches} from '../../lmk/employee/research/EmployeeResearches';
import OrganizationTrashedEmployees from '../../lmk/organization/OrganizationTrashedEmployees';

export class LmkRoutes extends React.PureComponent {
  render() {
    return (
      <>
        <Route
          exact
          path="/services/lmk/hospital/:id"
          component={(props: any) => <Hospital {...props} />}
        />
        <Route
          exact
          path="/services/lmk/hospitals"
          component={(props: any) => <Hospitals {...props} />}
        />
        <Route
          exact
          path="/services/lmk/hospitals/create"
          component={(props: any) => <NewHospital {...props} />}
        />
        <Route
          exact
          path="/services/lmk/hospitals/edit/:id"
          component={(props: any) => <EditHospital {...props} />}
        />
        <Route
          exact
          path="/services/lmk/hospitals/researches/:idHospital"
          component={(props: any) => <HospitalResearches {...props} />}
        />

        <Route
          exact
          path="/services/lmk/organization/:id"
          component={(props: any) => <OrganizationContainer {...props} />}
        />
        <Route
          exact
          path="/services/lmk/organizations"
          component={(props: any) => <OrganizationsContainer {...props} />}
        />
        <Route
          exact
          path="/services/lmk/organizations/create"
          component={(props: any) => <NewOrganizationContainer {...props} />}
        />
        <Route
          exact
          path="/services/lmk/organizations/edit/:id"
          component={(props: any) => <EditOrganization {...props} />}
        />
        <Route
          exact
          path="/services/lmk/organizations/employees/:idOrganization"
          component={(props: any) => (
            <OrganizationEmployees {...props} type={'all'} />
          )}
        />
        <Route
          exact
          path="/services/lmk/organizations/employeesExpired/:idOrganization"
          component={(props: any) => (
            <OrganizationEmployees {...props} type={'expired'} />
          )}
        />
        <Route
          exact
          path="/services/lmk/organizations/employeesEnds/:idOrganization"
          component={(props: any) => (
            <OrganizationEmployees {...props} type={'ends'} />
          )}
        />
        <Route
          exact
          path="/services/lmk/organizations/trashedEmployees/:idOrganization"
          component={(props: any) => (
            <OrganizationTrashedEmployees {...props} />
          )}
        />
        <Route
          exact
          path="/services/lmk/organizations/budget/:idOrganization"
          component={(props: any) => <OrganizationBudget {...props} />}
        />

        <Route
          exact
          path="/services/lmk/researches"
          component={(props: any) => <Researches {...props} />}
        />
        <Route
          exact
          path="/services/lmk/researches/create"
          component={(props: any) => <NewResearch {...props} />}
        />
        <Route
          exact
          path="/services/lmk/researches/edit/:id"
          component={(props: any) => <EditResearch {...props} />}
        />

        <Route
          exact
          path="/services/lmk/employee/:id"
          component={(props: any) => <Employee {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employees"
          component={(props: any) => <Employees {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employeesDeleted"
          component={(props: any) => <EmployeesDeleted {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employees/create"
          component={(props: any) => <NewEmployee {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employees/edit/:id"
          component={(props: any) => <EditEmployee {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employees/print/:id"
          component={(props: any) => <PrintEmployee {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employees/researches/:idEmployee"
          component={(props: any) => <EmployeeResearches {...props} />}
        />
      </>
    );
  }
}
