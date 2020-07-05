import React from 'react';
import {DateHelper} from '../../../utils/dateHelper';
import {IOrganization} from '../../../interface/lmk/IOrganization';

interface IProps {
  organization: IOrganization;
}

export const SendFrom: React.FC<IProps> = ({organization}) => (
  <>
    <tr>
      <td>
        <span style={{fontWeight: 600}}>Сотрудника направил:</span>
      </td>
    </tr>
    <tr>
      <td>Должность: {organization && organization.head_position}</td>
    </tr>
    <tr>
      <td>
        ФИО: {organization && organization.users && organization.users[0].fio}
      </td>
    </tr>
    <tr>
      <td>Телефон: {organization && organization.head_phone}</td>
    </tr>
    <tr>
      <td>Дата: {DateHelper.getFullDate()}</td>
    </tr>
    <tr>
      <td colSpan={1} style={{width: '50%'}}>
        Подпись ______________________М.П.
      </td>
    </tr>
  </>
);
