import React from 'react';
import {IEmployee} from '../../../../interface/lmk/IEmployee';
import {IOrganization} from '../../../../interface/lmk/IOrganization';

interface IProps {
  employee: IEmployee;
}

interface IPropsAdd {
  organization: IOrganization;
}

export const EmployeeInfo: React.FC<IProps> = ({employee}) => (
  <div style={{width: '60%'}}>
    <div style={{marginBottom: '8px'}}>
      <span style={{fontWeight: 800}}>Сотрудник</span>
    </div>
    <div>ФИО: {employee.fio}</div>
    {employee.date_birthday && (
      <div>Дата рождения: {employee.date_birthday}</div>
    )}
    <div>
      Пол:&nbsp;
      <select>
        <option />
        <option>Мужской</option>
        <option>Женский</option>
      </select>
    </div>
    {employee.department && <div>Отдел: {employee.department}</div>}
    {employee.position && <div>Должность: {employee.position}</div>}
    {employee.category && (
      <div>Категория организации: {employee.category?.name}</div>
    )}
    <div>
      Номер полиса ОМС / ДМС: <input type="text" />
    </div>
  </div>
);

export const HeadInfo: React.FC<IPropsAdd> = ({organization}) => (
  <div style={{width: '40%'}}>
    <div style={{marginBottom: '8px'}}>
      <span style={{fontWeight: 800}}>Организация</span>
    </div>
    <div>
      <span>Наименование:</span>&nbsp; {organization.name}
    </div>
    {organization.head_email && (
      <div>
        <span>Email:</span>&nbsp;{organization.head_email}
      </div>
    )}
    {organization.head_phone && (
      <div>
        <span>Телефон:</span>&nbsp;{organization.head_phone}
      </div>
    )}
    {organization.okved && (
      <div>
        <span>ОКВЭД:</span>&nbsp;{organization.okved}
      </div>
    )}
  </div>
);
