import React from 'react';
import {Route} from 'react-router-dom';

import {AuditorsContainer} from '../../audits/auditors/Auditors';
import {CriterionContainer} from '../../audits/criterion/Criterion';
import EditCriterion from '../../audits/criterion/Edit';
import {CriterionsContainer} from '../../audits/criterion/Criterions';
import {NewCriterionListContainer} from '../../audits/criterionList/New';
import {EditCriterionListContainer} from '../../audits/criterionList/Edit';
import {CriterionListContainer} from '../../audits/criterionList/criterionList';
import {CriterionListsContainer} from '../../audits/criterionList/criterionLists';
import {PlaceCheckListContainer} from '../../audits/placeCheckList/PlaceCheckList';
import {AddPlaceCheckListContainer} from '../../audits/placeCheckList/AddPlaceCheckList';
import {PlaceCheckListCriterionsContainer} from '../../audits/placeCheckList/PlaceCheckListCriterions';
import {PlaceCheckListCriterionsEditContainer} from '../../audits/placeCheckList/PlaceCheckListCriterionsEdit';
import {PlaceContainer} from '../../audits/place/Place';
import {UnitContainer} from '../../audits/unit/Unit';
import {LocationContainer} from '../../audits/location/Location';
import {EditUnitContainer} from '../../audits/unit/Edit';
import {EditLocationContainer} from '../../audits/location/Edit';
import {EditPlaceContainer} from '../../audits/place/Edit';
import {GroupCriterionContainer} from '../../audits/groupCriterion/GroupCriterion';
import {EditGroupCriterionContainer} from '../../audits/groupCriterion/Edit';
import {GroupCriterionListContainer} from '../../audits/groupCriterionList/GroupCriterionList';
import {EditGroupCriterionListContainer} from '../../audits/groupCriterionList/Edit';
import {Objects} from "../../audits/objects/Objects";

export class AuditsRoutes extends React.PureComponent {
  render() {
    return (
      <>
        <Route
          exact
          path="/services/audits/auditors"
          component={(props: any) => <AuditorsContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterion/:id"
          component={(props: any) => <CriterionContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterions"
          component={(props: any) => <CriterionsContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterions/edit/:id"
          component={(props: any) => <EditCriterion {...props} />}
        />

        <Route
          exact
          path="/services/audits/criterionList/:id"
          component={(props: any) => <CriterionListContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterionLists"
          component={(props: any) => <CriterionListsContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterionLists/create"
          component={(props: any) => <NewCriterionListContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/criterionLists/edit/:id"
          component={(props: any) => <EditCriterionListContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/placeCheckList/:id"
          component={(props: any) => <PlaceCheckListContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/addPlaceCheckList/:id"
          component={(props: any) => <AddPlaceCheckListContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/placeCheckList/criterions/:id"
          component={(props: any) => (
            <PlaceCheckListCriterionsContainer {...props} />
          )}
        />
        <Route
          exact
          path="/services/audits/placeCheckList/criterions/edit/:id"
          component={(props: any) => (
            <PlaceCheckListCriterionsEditContainer {...props} />
          )}
        />

        <Route
          exact
          path="/services/audits/unit/:id"
          component={(props: any) => <UnitContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/unit/edit/:id"
          component={(props: any) => <EditUnitContainer {...props} />}
        />

        <Route
          exact
          path="/services/audits/location/:id"
          component={(props: any) => <LocationContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/location/edit/:id"
          component={(props: any) => <EditLocationContainer {...props} />}
        />

        <Route
          exact
          path="/services/audits/place/:id"
          component={(props: any) => <PlaceContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/place/edit/:id"
          component={(props: any) => <EditPlaceContainer {...props} />}
        />

        <Route
          exact
          path="/services/audits/groupCriterion/:id"
          component={(props: any) => <GroupCriterionContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/groupCriterion/edit/:id"
          component={(props: any) => <EditGroupCriterionContainer {...props} />}
        />

        <Route
          exact
          path="/services/audits/groupCriterionList/:id"
          component={(props: any) => <GroupCriterionListContainer {...props} />}
        />
        <Route
          exact
          path="/services/audits/groupCriterionList/edit/:id"
          component={(props: any) => (
            <EditGroupCriterionListContainer {...props} />
          )}
        />

        <Route
          exact
          path="/services/audits/objects"
          component={(props: any) => (
            <Objects {...props} />
          )}
        />
      </>
    );
  }
}
