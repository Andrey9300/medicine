import {ICategory} from './ICategory';

export interface IResearchPeriod {
  id: number;
  name: string;
  period: number; // enum
}

export interface IResearch {
  description: string;
  id: number;
  name: string;
  period_id: number;
}

export interface IUserResearches {
  category: ICategory;
  category_id: number;
  check: boolean;
  id: number;
  research: IResearch;
  research_id: number;
}

export interface IEmployeeResearches {
  description: string;
  id: number;
  name: string;
  period_id: number;
  research_period: IResearchPeriod;
}
