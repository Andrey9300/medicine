export type TPestPlaceType = '1' | '2' | '3'; // 1 - насекомые, 2 летучие, 3 грызуны

export interface IPestPlace {
  id: number;
  name: string;
  type: TPestPlaceType;
}
