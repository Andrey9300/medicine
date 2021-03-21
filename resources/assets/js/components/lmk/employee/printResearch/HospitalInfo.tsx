import React from 'react';
import {IHospital} from '../../../../interface/lmk/IHospital';

interface IProps {
  hospital: IHospital;
}

export const HospitalInfo: React.FC<IProps> = ({hospital}) => (
  <div style={{width: '40%'}}>
    <div style={{marginBottom: '8px'}}>
      <span style={{fontWeight: 800}}>
        Информация о медицинской организации
      </span>
    </div>
    <div>Наименование: «{hospital.name}»</div>
    <div>Адрес: {hospital.address}</div>
    <div>ОГРН: {hospital.ogrn}</div>
    <div>Email: {hospital.email}</div>
    <div>Режим работы: {hospital.shedule}</div>
    <div>Телефон: {hospital.phone}</div>
  </div>
);
