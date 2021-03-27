import React from 'react';
import {IEmployee} from '../../../../interface/lmk/IEmployee';
import {IResearch} from '../../../../interface/lmk/IResearch';
import {IEmployeeResearch} from '../../../../interface/lmk/IEmployeeResearch';

interface IProps {
  employee: IEmployee;
  needForResearch: any;
  employeeResearches: IEmployeeResearch[];
}

export class ResearchesPrint extends React.PureComponent<IProps> {
  getVaccines = (researches: IResearch[]) => {
    // в отдельный раздел вакцины
    let vaccines = researches.filter(
      (research) =>
        research.id === 13 || research.id === 15 || research.id === 16,
    );
    const vaccinesVgaV1 = researches.find((research) => research.id === 14);
    const vaccinesVgaV2 = researches.find((research) => research.id === 20);

    if (vaccinesVgaV1) {
      vaccines.push(vaccinesVgaV1);
    }

    if (vaccinesVgaV2 && !vaccinesVgaV1) {
      vaccines.push(vaccinesVgaV2);
    }

    const vaccinesBlock = vaccines.map((vaccine, index) => {
      return (
        <div
          key={index}
          style={{
            boxSizing: 'border-box',
            flexGrow: 1,
            width: '50%',
          }}
        >
          {vaccine.name}
        </div>
      );
    });

    return (
      <React.Fragment key={9999999}>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>{vaccinesBlock}</div>
        <div>
          Форма оплаты:{' '}
          <select>
            <option />
            <option>За счет сотрудника</option>
            <option>За счет организации</option>
          </select>
        </div>
      </React.Fragment>
    );
  };

  addNeedForResearch = (): IResearch[] => {
    const {needForResearch, employeeResearches} = this.props;
    const researches: IResearch[] = [];

    if (!needForResearch) {
      return null;
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
    const researchesDiv: any[] = [];
    const researches: IResearch[] = employee.researches_expired.concat(
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
        research.id !== 15 &&
        research.id !== 16 &&
        research.id !== 20
      );
    });

    filterResearches.forEach((research, index) => {
      researchesDiv.push(
        <div
          key={index}
          style={{
            boxSizing: 'border-box',
            flexGrow: 1,
            width: '50%',
          }}
        >
          {research.name}
        </div>,
      );
    });

    return {researchesDiv, vaccinesDiv: this.getVaccines(researches)};
  };

  render() {
    const {researchesDiv, vaccinesDiv} = this.researches();

    return (
      <>
        <div style={{paddingTop: '12px'}}>
          <div
            style={{
              textAlign: 'center',
              fontWeight: 600,
              borderTop: '1px solid',
            }}
          >
            Провести медицинское обследования в объеме
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {researchesDiv}
          </div>
        </div>
        <div style={{borderBottom: '1px solid', padding: '12px 0px'}}>
          <div
            style={{
              textAlign: 'center',
              fontWeight: 600,
              borderTop: '1px solid',
            }}
          >
            Вакцинация
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {vaccinesDiv}
          </div>
        </div>
      </>
    );
  }
}
