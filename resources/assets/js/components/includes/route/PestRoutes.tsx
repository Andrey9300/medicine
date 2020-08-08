import React from 'react';
import {Route} from 'react-router-dom';

import {PestLocationContainer} from '../../pest/pestLocation/PestLocationContainer';
import {NewPestLocationContainer} from '../../pest/pestLocation/New';
import {EditPestLocationContainer} from '../../pest/pestLocation/Edit';
import {PestLocationsContainer} from '../../pest/pestLocation/PestLocationsContainer';
import {PestPlaceContainer} from '../../pest/pestPlace/PestPlaceContainer';
import {NewPestPlaceContainer} from '../../pest/pestPlace/New';
import {PestPlacesContainer} from '../../pest/pestPlace/PestPlacesContainer';
import {EditPestPlaceContainer} from '../../pest/pestPlace/Edit';
import {PestControlContainer} from '../../pest/pestControl/PestControlContainer';
import {EditPestControlContainer} from '../../pest/pestControl/Edit';
import {NewPestUnitContainer} from '../../pest/pestUnit/New';
import {EditPestUnitContainer} from "../../pest/pestUnit/Edit";

export class PestRoutes extends React.PureComponent {
  render() {
    return (
      <>
        <Route
          exact
          path="/services/pest/locations"
          component={(props: any) => <PestLocationsContainer {...props} />}
        />
        <Route
          exact
          path="/services/pest/locations/create"
          component={(props: any) => <NewPestLocationContainer {...props} />}
        />
        <Route
          exact
          path="/services/pest/locations/:id"
          component={(props: any) => <PestLocationContainer {...props} />}
        />
        <Route
          exact
          path="/services/pest/locations/edit/:id"
          component={(props: any) => <EditPestLocationContainer {...props} />}
        />
        <Route
          exact
          path="/services/pest/places"
          component={(props: any) => <PestPlacesContainer {...props} />}
        />
        <Route
          exact
          path="/services/pest/places/create"
          component={(props: any) => <NewPestPlaceContainer {...props} />}
        />
        <Route
          exact
          path="/services/pest/places/:id"
          component={(props: any) => <PestPlaceContainer {...props} />}
        />
        <Route
          exact
          path="/services/pest/places/edit/:id"
          component={(props: any) => <EditPestPlaceContainer {...props} />}
        />
        <Route
          exact
          path="/services/pest/control/:id"
          component={(props: any) => <PestControlContainer {...props} />}
        />
        <Route
          exact
          path="/services/pest/control/edit/:id"
          component={(props: any) => <EditPestControlContainer {...props} />}
        />

        <Route
          exact
          path="/services/pest/units/create"
          component={(props: any) => <NewPestUnitContainer {...props} />}
        />
        <Route
          exact
          path="/services/pest/units/edit"
          component={(props: any) => <EditPestUnitContainer {...props} />}
        />
      </>
    );
  }
}
