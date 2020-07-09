import {ILocation} from "./ILocation";

export interface IUnit {
  id: number;
  name: string;
  user_id: number;
  locations: ILocation[];
}