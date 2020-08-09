export interface IPestUnit {
  id: number;
  name: string;
  manager: string;
  check_organization: string;
  files: {
    name: string;
    link: string;
  }[];
  user_id: number;
}
