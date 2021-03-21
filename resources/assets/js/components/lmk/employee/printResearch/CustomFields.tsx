import React from 'react';

export const MedCheck: React.FC = () => (
  <div
    style={{
      display: 'flex',
      marginTop: '12px',
      paddingBottom: '12px',
      borderBottom: '1px solid',
    }}
  >
    <div
      style={{
        marginRight: '16px',
      }}
    >
      Медицинский осмотр{' '}
      <select>
        <option />
        <option>Нет</option>
        <option>Предварительный</option>
        <option>Периодический</option>
      </select>
    </div>
    <div>
      Форма оплаты:{' '}
      <select>
        <option />
        <option>За счет сотрудника</option>
        <option>За счет организации</option>
      </select>
    </div>
  </div>
);

export const PsychiatricCheck: React.FC = () => (
  <div
    style={{
      display: 'flex',
      padding: '12px 0px',
      borderBottom: '1px solid',
    }}
  >
    <div
      style={{
        marginRight: '16px',
      }}
    >
      Психиатрическое освидетельствование{' '}
      <select>
        <option />
        <option>Да</option>
        <option>Нет</option>
      </select>
    </div>
    <div>
      Форма оплаты:{' '}
      <select>
        <option />
        <option>За счет сотрудника</option>
        <option>За счет организации</option>
      </select>
    </div>
  </div>
);

export const PassedTo: React.FC = () => (
  <div style={{width: '60%'}}>
    <div style={{marginBottom: '4px'}}>
      <span style={{fontWeight: 600}}>Пройти медицинский осмотр до: </span>
      <input type="text" />
    </div>
    <textarea
      style={{width: '90%'}}
      rows={7}
      defaultValue="Дополнительная информация"
    />
  </div>
);

export const LmkInfo: React.FC = () => (
  <div style={{display: 'flex', marginTop: '12px'}}>
    <div
      style={{
        marginRight: '16px',
      }}
    >
      ЛМК{' '}
      <select>
        <option />
        <option>Нет</option>
        <option>Новая</option>
        <option>Продление</option>
      </select>
    </div>
    <div>
      Форма оплаты:{' '}
      <select>
        <option />
        <option>За счет сотрудника</option>
        <option>За счет организации</option>
      </select>
    </div>
  </div>
);
