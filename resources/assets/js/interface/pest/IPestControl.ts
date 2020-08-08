import {IPestPlace} from './IPestPlace';

export interface IPestControl {
  id: number;
  comment: string;
  created_at: string;
}

export type TChecked = '1' | '2' | '3';

export interface IPestControlCriterion {
  id: number;
  checked: TChecked;
  count: number;
  changed: boolean;
  place_id: number;
  pest_control_id: number;
  place: IPestPlace;
}
