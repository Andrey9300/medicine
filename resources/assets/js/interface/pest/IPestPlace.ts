export type TPestPlaceType = '1' | '2' | '3'; // 1 - ползающие насекомые, 2 Летающие насекомые, 3 грызуны

export interface IPestPlace {
  id: number;
  name: string;
  type: TPestPlaceType;
}

export enum EIconsPestPlace {
  INSECT = '/img/cockroach.png',
  FLY = '/img/fly.png',
  MOUSE = '/img/rat.png',
}