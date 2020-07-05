import {ICategory} from './ICategory';
import {IOrganization} from './IOrganization';
import {IEmployeeResearch} from './IEmployeeResearch';
import {IEmployeeResearches} from './IResearch';

export interface IEmployee {
  category: ICategory;
  category_id: number;
  comments: string;
  date_birthday: string;
  date_employment: string;
  deleted_at: string;
  department: string;
  fio: string;
  id: number;
  medical_book: string;
  organization: IOrganization;
  organization_name: string;
  pay: boolean;
  position: string;
  researches_ends: IEmployeeResearches[];
  researches_expired: IEmployeeResearches[];
  employeeResearches: IEmployeeResearch[];
  send_to_research: string;
  user_id: number;
}
