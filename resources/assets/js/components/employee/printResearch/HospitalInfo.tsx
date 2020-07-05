import React from 'react';
import {IHospital} from "../../../interface/lmk/IHospital";

interface IProps {
  hospital: IHospital;
}

export const HospitalInfo: React.FC<IProps> = ({hospital}) => (
  <>
    <tr>
      <td>
        <span style={{fontWeight: 600}}>
          Информация о медицинской организации «{hospital.name}»
        </span>
        :
      </td>
    </tr>
    <tr>
      <td>Адрес: {hospital.address}</td>
    </tr>
    <tr>
      <td>Режим работы: {hospital.shedule}</td>
    </tr>
    <tr>
      <td>Телефон: {hospital.phone}</td>
    </tr>
    <tr
      style={{
        borderBottom: '1px solid',
        width: '50%',
      }}
    >
      <td
        style={{
          fontStyle: 'italic',
        }}
      >
        * При себе иметь документ удостоверяющий личность и для новой ЛМК фото
        3х4
      </td>
    </tr>
  </>
);
