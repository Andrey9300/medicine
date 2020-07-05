import React from 'react';
import {IEmployee} from '../../../interface/lmk/IEmployee';

interface IProps {
  employee: IEmployee;
}

interface IPropsAdd extends IProps {
  photoMap: string;
}

export const EmployeeInfo: React.FC<IProps> = ({employee}) => (
  <>
    <tr>
      <td>
        <span style={{fontWeight: 600}}>Сотрудник:</span>
      </td>
    </tr>
    <tr>
      <td colSpan={1} style={{width: '50%'}}>
        ФИО: {employee.fio}
      </td>
    </tr>
    <tr>
      <td colSpan={1} style={{width: '50%'}}>
        Дата рождения: {employee.date_birthday}
      </td>
    </tr>
    <tr>
      <td colSpan={1} style={{width: '50%'}}>
        Отдел: {employee.department}
      </td>
    </tr>
    <tr>
      <td>Должность: {employee.position}</td>
    </tr>
  </>
);

export const EmployeeInfoAdditional: React.FC<IProps> = ({employee}) => (
  <>
    <tr>
      <td colSpan={2}>
        <span style={{marginRight: '12px'}}>
          <span style={{fontWeight: 600}}>1. Отдел:</span> {employee.department}
          <br />
        </span>
        <span style={{marginRight: '12px'}}>
          <span style={{fontWeight: 600}}>2. Должность:</span>{' '}
          {employee.position}
          <br />
        </span>
      </td>
    </tr>
  </>
);

export const HeadInfo: React.FC<IPropsAdd> = ({employee, photoMap}) => (
  <>
    <tr
      style={{
        borderTop: '1px solid',
        borderBottom: '1px solid',
      }}
    >
      <td
        style={{
          textAlign: 'center',
          fontWeight: 600,
        }}
        colSpan={2}
      >
        Направление на медицинский осмотр
      </td>
    </tr>
    <tr>
      <td colSpan={1} style={{width: '50%'}}>
        <span style={{fontWeight: 600}}>Наименование объекта:</span>
        &nbsp;
        {employee.organization_name}
      </td>
      <td colSpan={1} rowSpan={10}>
        <img width="400" height="240" src={`/storage/${photoMap}`} />
      </td>
    </tr>
  </>
);
