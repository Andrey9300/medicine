import {IPestPlace} from './IPestPlace';

export interface IPestControl {
  id: number;
  created_at: string;
}

export interface IPestControlCriterion {
  checked: boolean;
  count: number;
  changed: boolean;
  place_id: number;
  pest_control_id: number;
  place: IPestPlace;
}
