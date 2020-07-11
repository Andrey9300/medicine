import React from 'react';

import {GroupCriterionListsContainer} from "../groupCriterionList/GroupCriterionLists";
import {CriterionsContainer} from "../criterion/Criterions";

interface IProps {}

export const GroupsAndCriterionsComponent: React.FC<IProps> = () => (
  <>
    <GroupCriterionListsContainer />
    <CriterionsContainer />
  </>
);
