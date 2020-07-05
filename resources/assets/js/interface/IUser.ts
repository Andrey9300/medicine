export interface IUser {
  active: number;
  email: string;
  fio: string;
  id: number;
  pivot: {organization_id: number; user_id: number};
  role: 'admin' | 'manager';
}
