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

  render() {
    const {employees, title, status} = this.props;

    if (status.errors) {
      return this.getMessage('Ошибка, попробуйте снова');
    }

    if (!status.fetched) {
      return this.getMessage('Загрузка');
    }

    if (!employees || !employees.length) {
      return (
        <Card>
          <CardHeader>
            <i className="fa fa-users" aria-hidden="true" />
              {title}
            <Link
              to="/employees/create"
              className="btn btn-primary btn-sm pull-right"
            >
              Добавить <i className="icon-plus" />
            </Link>
          </CardHeader>
          <CardBody className="card-body">
            <div>Таких сотрудников нет</div>
            <Link to="/employees">Перейти ко всем сотрудникам</Link>
          </CardBody>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <i className="fa fa-users" aria-hidden="true" />
          {title} ({employees.length})
          <Link
            to="/employees/create"
            className="btn btn-primary btn-sm pull-right"
          >
            Добавить <i className="icon-plus" />
          </Link>
        </CardHeader>
        <CardBody className="card-body">
          <Table responsive>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Отправлен на МО</th>
                <th>Статус МО</th>
                <th>Направление</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                return (
                  <tr key={employee.id}>
                    <td>
                      <Link to={`/employee/${employee.id}`}>
                        {employee.fio}
                      </Link>
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
                    <td>
                      {employee.send_to_research && employee.send_to_research}
                    </td>
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

                        return <div className={classSpan}>{text}</div>;
                      })()}
                    </td>
                    <td>
                      {(employee.researches_ends.length > 0 ||
                        employee.researches_expired.length > 0) && (
                        <Link
                          to={`/employees/print/${employee.id}`}
                          className="btn btn-secondary btn-sm pull-left"
                        >
                          Направление
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <Link
            to="/employees/create"
            className="btn btn-primary btn-sm pull-right"
          >
            Добавить <i className="icon-plus" />
          </Link>
        </CardFooter>
      </Card>
    );
  }
}

EmployeesList.propTypes = {
  employees: PropTypes.array.isRequired,
  status: PropTypes.object.isRequired,
  user: PropTypes.object,
  title: PropTypes.string,
};
