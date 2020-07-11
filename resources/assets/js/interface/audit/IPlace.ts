import {IUnit} from "./IUnit";
import {ILocation} from "./ILocation";

export interface IPlace {
  id: number;
  name: string;
  user_id: number;
  unit: IUnit;
  location: ILocation;
}
