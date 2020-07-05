import React from 'react';
import {IEmployee} from '../../../interface/lmk/IEmployee';
import {IResearch} from '../../../interface/lmk/IResearch';
import {IEmployeeResearch} from '../../../interface/lmk/IEmployeeResearch';

interface IProps {
  employee: IEmployee;
  needForResearch: any;
  employeeResearches: IEmployeeResearch[];
}

export class ResearchesPrint extends React.PureComponent<IProps> {
  getVaccines = (researches: IResearch[]) => {
    const {employee} = this.props;
    if (employee.category.id !== 2) {
      return null;
    }

    // в отдельный раздел Гепатит и Зонне
    let vaccines = researches.filter((research) => {
      return research.id === 13 || research.id === 14 || research.id === 20;
    });
    const vaccinesVga = researches.filter((research) => {
      return research.id === 14 || research.id === 20;
    });

    // берем только ВГА1
    if (vaccinesVga.length > 1) {
      vaccines = researches.filter((research) => {
        return research.id === 13 || research.id === 14;
      });
    }

    const vaccinesBlock = vaccines.map((vaccine, index) => {
      return (
        <div key={index}>
          {vaccine.name} -{' '}
          <select>
            <option>Да</option>
          </select>
        </div>
      );
    });

    return (
      <React.Fragment key={9999999}>
        <tr
          style={{
            borderTop: '1px solid',
          }}
        >
          <td>{vaccinesBlock}</td>
          <td>
            Форма оплаты:{' '}
            <select>
              <option />
              <option>За счет сотрудника</option>
              <option>За счет организации</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <span style={{fontWeight: 600}}>
              Важно: вы можете провести вакцинацию БЕСПЛАТНО по месту жительства
              по полису ОМС, с предоставлением справки или прививочного
              сертификата.
            </span>
            <br />
            Вакцинация от Вирусного гепатита А проводится двукратно с интервалом
            6-18 мес.
            <br />
            Вакцинация от дизентерии Зонне проводится ежегодно
          </td>
        </tr>
      </React.Fragment>
    );
  };

  // TODO: проверить типы, не состыковываются
  addNeedForResearch = (): any => {
    const {needForResearch, employeeResearches} = this.props;
    const researches: IResearch[] = [];

    if (!needForResearch) {
      return [];
    }

    needForResearch.forEach((value: any, key: any) => {
      employeeResearches.forEach((employeeResearch) => {
        if (employeeResearch.research.id === Number(key)) {
          researches.push(employeeResearch.research);
        }
      });
    });

    return researches;
  };

  researches = () => {
    const {employee} = this.props;
    const bufferTr: any[] = [];
    let bufferTd: any[] = [];
    const researches = employee.researches_expired.concat(
      employee.researches_ends,
    );

    researches.push(...this.addNeedForResearch());

    // в отдельный раздел псих. осв., предварительный / периодический МО
    const filterResearches = researches.filter((research) => {
      return (
        research.id !== 19 &&
        research.id !== 18 &&
        research.id !== 13 &&
        research.id !== 14 &&
        research.id !== 20
      );
    });

    filterResearches.forEach((research, index) => {
      if (index % 2 === 1) {
        bufferTr.push(
          <tr key={index}>
            {bufferTd}
            <td>{research.name}</td>
          </tr>,
        );
        bufferTd = [];
      } else {
        bufferTd.push(<td key={index}>{research.name}</td>);
      }
    });

    if (bufferTd.length) {
      bufferTr.push(<tr key={999}>{bufferTd}</tr>);
    }

    bufferTr.push(this.getVaccines(researches));

    return bufferTr;
  };

  render() {
    return (
      <>
        <tr>
          <td
            style={{
              textAlign: 'center',
              fontWeight: 600,
            }}
            colSpan={2}
          >
            Провести медицинское обследования в объеме:
          </td>
        </tr>
        {this.researches()}
      </>
    );
  }
}
