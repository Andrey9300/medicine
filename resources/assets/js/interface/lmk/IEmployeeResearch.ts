import {ICategory} from './ICategory';
import {IResearch} from './IResearch';

export interface IEmployeeResearch {
  category: ICategory;
  category_id: number;
  date: string;
  id: number;
  is_exception: boolean;
  pivot: {user_id: number; research_categories_id: number; id: number};
  research: IResearch;
  research_id: number;
}
