import {ICriterionList} from './ICriterionList';
import {ICriterion} from './ICriterion';

export interface IPlaceCheckListCriterion {
  comment_at_auditor: string;
  comment_from_auditor: string;
  criterion: ICriterion;
  criterions_id: number;
  id: number;
  mark: string;
  place_check_lists_id: number;
  user_id: number;
}

export interface IPlaceCheckList extends ICriterionList {
  criterions: ICriterion[];
}
