import React from 'react';
import {Route} from 'react-router-dom';

import Login from '../../components/includes/Login';
import Registration from '../../components/includes/Registration';
import RestorePassword from '../../components/includes/RestorePassword';
import ResetPassword from '../../components/includes/ResetPassword';
import ActivateAccount from '../../components/includes/ActivateAccount';

import EditHospital from '../../components/hospital/Edit';
import Hospital from '../../components/hospital/Hospital';
import Hospitals from '../../components/hospital/Hospitals';
import NewHospital from '../../components/hospital/New';

import HospitalResearches from '../../components/hospital/research/HospitalResearches';

import EditOrganization from '../../components/organization/Edit';
import {OrganizationContainer} from '../../components/organization/Organization';
import {OrganizationsContainer} from '../../components/organization/Organizations';
import {NewOrganizationContainer} from '../../components/organization/New';
import OrganizationEmployees from '../../components/organization/OrganizationEmployees';
import OrganizationBudget from '../../components/organization/budget/Budget';

import EditResearch from '../../components/research/Edit';
import Researches from '../../components/research/Researches';
import NewResearch from '../../components/research/New';

import EditEmployee from '../../components/employee/Edit';
import PrintEmployee from '../../components/employee/PrintResearch';
import Employee from '../../components/employee/Employee';
import {Employees} from '../employee/Employees';
import EmployeesDeleted from '../../components/employee/EmployeesDeleted';
import NewEmployee from '../../components/employee/New';

import {Main} from '../../components/main/Main';

import EmployeeResearches from '../../components/employee/research/EmployeeResearches';
import {UserContainer} from '../user/User';
import {EditUserContainer} from '../user/Edit';
import {AuditorsContainer} from '../auditors/Auditors';
import {NewUserContainer} from '../user/New';
import {CurrentUserContainer} from '../user/CurrentUser';
import {CriterionContainer} from '../criterion/Criterion';
import EditCriterion from '../criterion/Edit';
import {CriterionsContainer} from '../criterion/Criterions';
import {StructureCheckList} from '../structureCheckList/structureCheckList';
import {NewCriterionListContainer} from '../criterionList/New';
import {EditCriterionListContainer} from '../criterionList/Edit';
import {CriterionListContainer} from '../criterionList/criterionList';
import {CriterionListsContainer} from '../criterionList/criterionLists';
import {PlaceCheckListContainer} from '../placeCheckList/PlaceCheckList';
import {AddPlaceCheckListContainer} from '../placeCheckList/AddPlaceCheckList';
import {PlaceCheckListCriterionsContainer} from '../placeCheckList/PlaceCheckListCriterions';
import {PlaceCheckListCriterionsEditContainer} from '../placeCheckList/PlaceCheckListCriterionsEdit';
import OrganizationTrashedEmployees from '../organization/OrganizationTrashedEmployees';

export class Routes extends React.PureComponent {
  render() {
    return (
      <>
        {/*common*/}
        <Route
          exact
          path="/services/main"
          component={(props) => <Main {...props} />}
        />
        <Route
          exact
          path="/services/login"
          component={(props) => <Login {...props} />}
        />
        <Route
          exact
          path="/services/registration"
          component={(props) => <Registration {...props} />}
        />
        <Route
          exact
          path="/services/restorePassword"
          component={(props) => <RestorePassword {...props} />}
        />
        <Route
          exact
          path="/services/resetPassword"
          component={(props) => <ResetPassword {...props} />}
        />
        <Route
          exact
          path="/services/activateAccount"
          component={(props) => <ActivateAccount {...props} />}
        />
        <Route
          exact
          path="/services/profile"
          component={(props) => <CurrentUserContainer {...props} />}
        />
        <Route
          exact
          path="/services/profiles/:id"
          component={(props) => <UserContainer {...props} />}
        />
        <Route
          exact
          path="/services/profiles/edit/:id"
          component={(props) => <EditUserContainer {...props} />}
        />
        <Route
          exact
          path="/services/profiles/create"
          component={(props) => <NewUserContainer {...props} />}
        />

        {/*lmk*/}
        <Route
          exact
          path="/services/lmk/hospital/:id"
          component={(props) => <Hospital {...props} />}
        />
        <Route
          exact
          path="/services/lmk/hospitals"
          component={(props) => <Hospitals {...props} />}
        />
        <Route
          exact
          path="/services/lmk/hospitals/create"
          component={(props) => <NewHospital {...props} />}
        />
        <Route
          exact
          path="/services/lmk/hospitals/edit/:id"
          component={(props) => <EditHospital {...props} />}
        />
        <Route
          exact
          path="/services/lmk/hospitals/researches/:idHospital"
          component={(props) => <HospitalResearches {...props} />}
        />

        <Route
          exact
          path="/services/lmk/organization/:id"
          component={(props) => <OrganizationContainer {...props} />}
        />
        <Route
          exact
          path="/services/lmk/organizations"
          component={(props) => <OrganizationsContainer {...props} />}
        />
        <Route
          exact
          path="/services/lmk/organizations/create"
          component={(props) => <NewOrganizationContainer {...props} />}
        />
        <Route
          exact
          path="/services/lmk/organizations/edit/:id"
          component={(props) => <EditOrganization {...props} />}
        />
        <Route
          exact
          path="/services/lmk/organizations/employees/:idOrganization"
          component={(props) => (
            <OrganizationEmployees {...props} type={'all'} />
          )}
        />
        <Route
          exact
          path="/services/lmk/organizations/employeesExpired/:idOrganization"
          component={(props) => (
            <OrganizationEmployees {...props} type={'expired'} />
          )}
        />
        <Route
          exact
          path="/services/lmk/organizations/employeesEnds/:idOrganization"
          component={(props) => (
            <OrganizationEmployees {...props} type={'ends'} />
          )}
        />
        <Route
          exact
          path="/services/lmk/organizations/trashedEmployees/:idOrganization"
          component={(props) => <OrganizationTrashedEmployees {...props} />}
        />
        <Route
          exact
          path="/services/lmk/organizations/budget/:idOrganization"
          component={(props) => <OrganizationBudget {...props} />}
        />

        <Route
          exact
          path="/services/lmk/researches"
          component={(props) => <Researches {...props} />}
        />
        <Route
          exact
          path="/services/lmk/researches/create"
          component={(props) => <NewResearch {...props} />}
        />
        <Route
          exact
          path="/services/lmk/researches/edit/:id"
          component={(props) => <EditResearch {...props} />}
        />

        <Route
          exact
          path="/services/lmk/employee/:id"
          component={(props) => <Employee {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employees"
          component={(props) => <Employees {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employeesDeleted"
          component={(props) => <EmployeesDeleted {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employees/create"
          component={(props) => <NewEmployee {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employees/edit/:id"
          component={(props) => <EditEmployee {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employees/print/:id"
          component={(props) => <PrintEmployee {...props} />}
        />
        <Route
          exact
          path="/services/lmk/employees/researches/:idEmployee"
          component={(props) => <EmployeeResearches {...props} />}
        />

        <Route
          exact
          path="/services/lmk/placeCheckList/:id"
          component={(props) => <PlaceCheckListContainer {...props} />}
        />
        <Route
          exact
          path="/services/lmk/addPlaceCheckList/:id"
          component={(props) => <AddPlaceCheckListContainer {...props} />}
        />
        <Route
          exact
          path="/services/lmk/placeCheckList/criterions/:id"
          component={(props) => (
            <PlaceCheckListCriterionsContainer {...props} />
          )}
        />
        <Route
          exact
          path="/services/lmk/placeCheckList/criterions/edit/:id"
          component={(props) => (
            <PlaceCheckListCriterionsEditContainer {...props} />
          )}
        />

        {/*auditors*/}
        <Route
          exact
          path="/services/audits/auditors"
          component={(props) => <AuditorsContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterion/:id"
          component={(props) => <CriterionContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterions"
          component={(props) => <CriterionsContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterions/edit/:id"
          component={(props) => <EditCriterion {...props} />}
        />

        <Route
          exact
          path="/services/audits/structureCheckList"
          component={(props) => <StructureCheckList {...props} />}
        />

        <Route
          exact
          path="/services/audits/criterionList/:id"
          component={(props) => <CriterionListContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterionLists"
          component={(props) => <CriterionListsContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterionLists/create"
          component={(props) => <NewCriterionListContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterionLists/edit/:id"
          component={(props) => <EditCriterionListContainer {...props} />}
        />
      </>
    );
  }
}
