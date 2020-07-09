import {IGroupCriterion} from "./IGroupCriterion";
import {ILocation} from "./ILocation";
import {IPlace} from "./IPlace";
import {IUnit} from "./IUnit";

export interface ICriterionList {
  groupCriterion: IGroupCriterion;
  id: number;
  location: ILocation;
  location_id: number;
  place: IPlace;
  place_id: number;
  unit: IUnit;
  unit_id: number;
  user_group_criterion_id: number;
  user_id: number;
}