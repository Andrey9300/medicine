import {Link} from 'react-router-dom';
import React from 'react';
import {Card, CardHeader, CardBlock, CardFooter, Table} from 'reactstrap';
import PropTypes from 'prop-types';

export class EmployeesList extends React.Component {
  render() {
    const {employees, title} = this.props;

    if (!employees || !employees.length) {
      return (
        <Card>
          <CardHeader>
            <i className="fa fa-users" aria-hidden="true"/>Cотрудников нет
          </CardHeader>
          <CardBlock className="card-body">
            <Link to={'/employees'}>Перейти ко всем сотрудникам</Link>
          </CardBlock>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <i className="fa fa-users" aria-hidden="true"/>{title} ({employees.length})
          <Link to="/employees/create" className="btn btn-primary btn-sm pull-right">
            Добавить <i className="icon-plus"/>
          </Link>
        </CardHeader>
        <CardBlock className="card-body">
          <Table responsive>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Объект</th>
                <th>Статус МО</th>
                <th>Направление</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                return (
                  <tr key={employee.id}>
                    <td>
                      <Link to={`/employees/${employee.id}`}>
                        {employee.fio}
                      </Link>
                    </td>
                    <td>{employee.organization_name}</td>
                    <td>
                      {(() => {
                        let text = '';
                        let classSpan = '';

                        if (employee.researches_ends.length) {
                          text = 'Просрочено';
                          classSpan = 'btn btn-danger btn-sm';
                        } else if (employee.researches_expired.length) {
                          text = 'Заканчивается';
                          classSpan = 'btn btn-warning btn-sm';
                        } else {
                          text = 'Пройден';
                          classSpan = 'btn btn-success btn-sm';
                        }

                        return (
                          <div className={classSpan}>{text}</div>
                        );
                      })()}
                    </td>
                    <td>
                      {(() => {
                        if (employee.researches_ends.length || employee.researches_expired.length) {
                          return (
                            <Link to={`/employees/print/${employee.id}`}
                              className="btn btn-secondary btn-sm pull-left">
                                                        Направление
                            </Link>
                          );
                        }

                        return '';
                      })()}
                    </td>
                  </tr>
                );
              })
              }
            </tbody>
          </Table>
        </CardBlock>
        <CardFooter>
          <Link to="/employees/create" className="btn btn-primary btn-sm pull-right">
            Добавить <i className="icon-plus"/>
          </Link>
        </CardFooter>
      </Card>
    );
  }
}

EmployeesList.propTypes = {
  employees: PropTypes.array.isRequired,
  user: PropTypes.object,
  title: PropTypes.string
};
