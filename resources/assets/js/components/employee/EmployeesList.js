import {Link} from 'react-router';
import React from 'react';
import {Card, CardHeader, CardBlock, CardFooter, Table, Button} from 'reactstrap';
import PropTypes from 'prop-types';

export class EmployeesList extends React.Component {
    render() {
        const {employees, user, handleBtnDelete, title} = this.props;
        let addButton = null;

        if (user && user.role === 'admin') {
            addButton =
                <Link to="employees/create" className="btn btn-primary btn-sm pull-right">
                    Добавить <i className="icon-plus"/>
                </Link>;
        }

        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-users" aria-hidden="true"/>{title}
                    ({employees.length})
                    {addButton}
                </CardHeader>
                <CardBlock className="card-body">
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Объект</th>
                            <th>Статус МО</th>
                            {(() => {
                                if (handleBtnDelete) {
                                    return (<th>Уволить</th>);
                                }
                            })()}
                            <th>Направление</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map((employee) => {
                            return (
                                <tr key={employee.id}>
                                    <td>
                                        <Link to={`employees/${employee.id}`}>
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
                                    {(() => {
                                        if (handleBtnDelete) {
                                            return (
                                                <td>
                                                    <Button type="submit" size="sm" color="danger"
                                                            onClick={
                                                                (event) => handleBtnDelete(employee.id, event)
                                                            }
                                                    >
                                                        Уволить
                                                    </Button>
                                                </td>
                                            );
                                        }
                                    })()}
                                    <td>
                                        {(() => {
                                            if (employee.researches_ends.length || employee.researches_expired.length) {
                                                return (
                                                    <Link to={`employees/print/${employee.id}`}
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
                    {addButton}
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
