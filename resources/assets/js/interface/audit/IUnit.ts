import {ILocation} from "./ILocation";

export interface IUnit {
  id: number;
  name: string;
  locations: ILocation[];
}
