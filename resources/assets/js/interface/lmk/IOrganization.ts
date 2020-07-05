import {ICategory} from './ICategory';
import {IEmployee} from './IEmployee';
import {IUser} from '../IUser';

export interface IOrganization {
  category: ICategory;
  category_id: number;
  employees: IEmployee[];
  trashedEmployees: IEmployee[];
  head_email: string;
  head_fio: string;
  head_phone: string;
  head_position: string;
  id: number;
  name: string;
  totalSumForCompletedResearches: number;
  totalSumForResearches: number;
  users: IUser[];
}
