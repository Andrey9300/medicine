import {ICriterionList} from './ICriterionList';
import {ICriterion} from './ICriterion';

export interface IPlaceCheckList extends ICriterionList {
  criterions: ICriterion[];
}
