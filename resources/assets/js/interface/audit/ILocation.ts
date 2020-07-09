import {IPlace} from "./IPlace";

export interface ILocation {
  id: number;
  name: string;
  unit_id: number;
  places: IPlace[];
}
