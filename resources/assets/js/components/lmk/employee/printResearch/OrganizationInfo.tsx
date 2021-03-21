import React from 'react';
import {DateHelper} from '../../../../utils/dateHelper';
import {IOrganization} from '../../../../interface/lmk/IOrganization';

interface IProps {
  organization: IOrganization;
}

export const SendFrom: React.FC<IProps> = ({organization}) => (
  <div style={{width: '40%'}}>
    <div>
      <span style={{fontWeight: 600}}>Сотрудника направил:</span>
    </div>
    <div>Должность: {organization && organization.head_position}</div>
    <div>
      ФИО: {organization && organization.users && organization.users[0].fio}
    </div>
    <div>Телефон: {organization && organization.head_phone}</div>
    <div>Дата: {DateHelper.getFullDate()}</div>
    <div>
      <span style={{width: '50%'}}>Подпись ______________________М.П.</span>
    </div>
  </div>
);
