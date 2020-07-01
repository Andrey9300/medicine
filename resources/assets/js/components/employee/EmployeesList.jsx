import {Link} from 'react-router-dom';
import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Table} from 'reactstrap';
import PropTypes from 'prop-types';

export class EmployeesList extends React.PureComponent {
  getMessage(message) {
    const {title} = this.props;

    return (
      <Card>
        <CardHeader>
          <i className="fa fa-users" aria-hidden="true" />
          {title}
        </CardHeader>
        <CardBody className="card-body">{message}</CardBody>
      </Card>
    );
  }

  getEmployeeResearchStatus(employee) {
    const researchesEnds =
      employee.researches_ends && employee.researches_ends.length;
    const researchesExpired =
      employee.researches_expired && employee.researches_expired.length;
    const researchesLoading =
      !employee.researches_ends && !employee.researches_expired;
    let text = '';
    let classSpan = '';

    if (researchesEnds) {
      text = 'Просрочено';
      classSpan = 'btn btn-danger btn-sm';
    } else if (researchesExpired) {
      text = 'Заканчивается';
      classSpan = 'btn btn-warning btn-sm';
    } else if (researchesLoading) {
      text = 'Загружается';
    } else {
      text = 'Пройден';
      classSpan = 'btn btn-success btn-sm';
    }

    return <div className={classSpan}>{text}</div>;
  }

  showEmployeesNotFound() {
    const {title} = this.props;

    return (
      <Card>
        <CardHeader>
          <i className="fa fa-users" aria-hidden="true" />
          {title}
          <Link
            to="/services/lmk/employees/create"
            className="btn btn-primary btn-sm pull-right"
          >
            Добавить <i className="icon-plus" />
          </Link>
        </CardHeader>
        <CardBody className="card-body">
          <div>Таких сотрудников нет</div>
          <Link to="/services/lmk/employees">Перейти ко всем сотрудникам</Link>
        </CardBody>
      </Card>
    );
  }

  showEmployee(employee) {
    const {
      status: {fetchedWithCheck},
    } = this.props;
    const width = fetchedWithCheck ? '20%' : '25%';

    return (
      <tr key={employee.id}>
        <td style={{width}}>
          <Link to={`/services/lmk/employee/${employee.id}`}>{employee.fio}</Link>
          <div
            style={{
              fontSize: '12px',
              fontStyle: 'italic',
              lineHeight: '24px',
              fontWeight: '300',
            }}
          >
            {employee.comments}
          </div>
        </td>
        <td style={{width}}>{employee.department}</td>
        <td style={{width}}>
          {employee.send_to_research ? employee.send_to_research : '-'}
        </td>
        {fetchedWithCheck && (
          <td style={{width}}>{this.getEmployeeResearchStatus(employee)}</td>
        )}
        <td style={{width}}>
          <Link
            to={`/services/lmk/employees/print/${employee.id}`}
            className="btn btn-secondary btn-sm pull-left"
          >
            Направление
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    const {
      employees,
      title,
      status: {fetched, fetchedWithCheck, errors},
    } = this.props;

    if (errors) {
      return this.getMessage('Ошибка, попробуйте снова');
    }

    if (!fetched) {
      return this.getMessage('Загрузка');
    }

    if (!employees || !employees.length) {
      return this.showEmployeesNotFound();
    }

    return (
      <Card>
        <CardHeader>
          <i className="fa fa-users" aria-hidden="true" />
          {title} ({employees.length})
        </CardHeader>
        <CardBody className="card-body">
          <Table responsive>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Отдел</th>
                <th>Отправлен на МО</th>
                {fetchedWithCheck && <th>Статус МО</th>}
                <th>Направление</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                return this.showEmployee(employee);
              })}
            </tbody>
          </Table>
        </CardBody>
        <CardFooter />
      </Card>
    );
  }
}

EmployeesList.propTypes = {
  employees: PropTypes.array.isRequired,
  status: PropTypes.object.isRequired,
  title: PropTypes.string,
};
