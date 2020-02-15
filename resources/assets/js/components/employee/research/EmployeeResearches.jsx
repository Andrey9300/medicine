import {addEmployeeResearches, fetchEmployeeResearches} from '../../../actions/employeeActions';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Table, Row, Col, Card, CardHeader, CardBlock, Button, Form, Input, CardFooter} from 'reactstrap';

class EmployeeResearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: props.idEmployee
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchEmployeeResearches(this.state.employeeId));
  }

  handleClick() {
    // TODO: валидация на клиенте
    this.props.dispatch(addEmployeeResearches(
      document.querySelector('form'),
      this.state.employeeId
    ));
  }

  createMarkup() {
    let html = '';

    Object.keys(this.props.errors).forEach((item) => {
      this.props.errors[item].forEach((value) => {
        html += `<p>${value}</p>`;
      });
    });

    return {
      __html: html
    };
  }

  render() {
    const {employeeResearches, errors} = this.props;
    let errorsMessage = '';

    if (employeeResearches === null) {
      return null;
    }

    if (errors) {
      errorsMessage =
                <div className="alert alert-danger" role="alert">
                  <div dangerouslySetInnerHTML={this.createMarkup()} />
                </div>;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="12" lg="8">
            <Card>
              <CardHeader>
                <i className="fa fa-heartbeat" aria-hidden="true"/>Даты исследований
                                ({employeeResearches.length})
                <Button type="submit" size="sm"
                  color="success pull-right"
                  onClick={this.handleClick}
                >
                  <i className="fa fa-dot-circle-o"/> Сохранить
                </Button>
              </CardHeader>
              <CardBlock className="card-body">
                <Form id="employeeResearch">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Исследование</th>
                        <th>Дата</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeResearches.map((employeeResearch) => {
                        return (
                          <tr key={employeeResearch.id}>
                            <td>{employeeResearch.research.name}</td>
                            <td>
                              <Input type="text"
                                placeholder="дд-мм-гггг"
                                name={`employeeResearch[${employeeResearch.pivot.id}]`}
                                defaultValue={employeeResearch.date}
                              />
                            </td>
                          </tr>
                        );
                      })
                      }
                    </tbody>
                  </Table>
                </Form>
              </CardBlock>
              <CardFooter>
                <Button type="submit" size="sm"
                  color="success pull-right"
                  onClick={this.handleClick}
                >
                  <i className="fa fa-dot-circle-o"/> Сохранить
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

EmployeeResearches.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    errors: state.employees.errors,
    employeeResearches: state.employees.employeeResearches,
    user: state.users.user
  };
};

export default connect(mapStateToProps)(EmployeeResearches);
