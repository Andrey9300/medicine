import React from 'react';

import {UnitsContainer} from '../unit/Units';
import {LocationsContainer} from '../location/Locations';
import {PlacesContainer} from '../place/Places';
import {CriterionsContainer} from '../criterion/Criterions';
import {GroupCriterionsContainer} from '../groupCriterion/GroupCriterions';
import {GroupCriterionListsContainer} from '../groupCriterionList/GroupCriterionLists';

export class StructureCheckList extends React.PureComponent {
  render() {
    return (
      <>
        <UnitsContainer />
        <LocationsContainer />
        <PlacesContainer />
        <GroupCriterionsContainer />
        <CriterionsContainer />
        <GroupCriterionListsContainer />
      </>
    );
  }
}
