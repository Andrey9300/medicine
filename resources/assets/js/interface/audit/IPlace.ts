import {IUnit} from "./IUnit";
import {ILocation} from "./ILocation";

export interface IPlace {
  id: number;
  name: string;
  unit: IUnit;
  location: ILocation;
}
