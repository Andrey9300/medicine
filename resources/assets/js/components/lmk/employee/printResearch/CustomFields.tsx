import React from 'react';

export const MedCheck: React.FC = () => (
  <>
    <tr
      style={{
        borderTop: '1px solid',
      }}
    >
      <td>
        <select>
          <option />
          <option>Нет</option>
          <option>Предварительный</option>
          <option>Периодический</option>
        </select>{' '}
        медицинский осмотр
      </td>
      <td>
        Форма оплаты:{' '}
        <select>
          <option />
          <option>За счет сотрудника</option>
          <option>За счет организации</option>
        </select>
      </td>
    </tr>
  </>
);

export const PsychiatricCheck: React.FC = () => (
  <>
    <tr
      style={{
        borderTop: '1px solid',
      }}
    >
      <td>
        Психиатрическое освидетельствование{' '}
        <select>
          <option />
          <option>Да</option>
          <option>Нет</option>
        </select>
      </td>
      <td>
        Форма оплаты:{' '}
        <select>
          <option />
          <option>За счет сотрудника</option>
          <option>За счет организации</option>
        </select>
      </td>
    </tr>
  </>
);

export const PassedTo: React.FC = () => (
  <>
    <tr
      style={{
        borderTop: '1px solid',
      }}
    >
      <td rowSpan={7}>
        <span style={{fontWeight: 600}}>Пройти медицинский осмотр до: </span>
        <input type="text" />
        <textarea
          style={{width: '100%'}}
          rows={7}
          defaultValue="Дополнительная информация"
        />
      </td>
      <td />
    </tr>
  </>
);

export const LmkInfo: React.FC = () => (
  <>
    <tr
      style={{
        borderTop: '1px solid',
      }}
    >
      <td colSpan={1}>
        <select>
          <option />
          <option>Нет</option>
          <option>Новая</option>
          <option>Продление</option>
        </select>{' '}
        ЛМК
      </td>
      <td colSpan={1}>
        Форма оплаты:{' '}
        <select>
          <option />
          <option>За счет сотрудника</option>
          <option>За счет организации</option>
        </select>
      </td>
    </tr>
  </>
);
