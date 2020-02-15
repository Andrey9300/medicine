import React from 'react';
import {connect} from 'react-redux';
import {fetchEmployee} from './../../actions/employeeActions';
import {fetchOrganizations} from './../../actions/organizationActions';
import PropTypes from 'prop-types';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, Label, Input} from 'reactstrap';
import {editEmployee} from '../../actions/employeeActions';

class EditEmployee extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: props.match.params.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(editEmployee(
      document.querySelector('form'),
      this.state.employeeId
    ));
  }

  componentWillMount() {
    this.props.dispatch(fetchEmployee(this.state.employeeId));
    this.props.dispatch(fetchOrganizations());
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
    const {employee, organizations, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage =
        <div className="alert alert-danger" role="alert">
          <div dangerouslySetInnerHTML={this.createMarkup()} />
        </div>;
    }

    if (!employee || !organizations) {
      return null;
    }

    return (
      <div>
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать сотрудника</CardHeader>
                <CardBlock className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ФИО</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="fio" name="fio" defaultValue={employee.fio}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Дата рождения</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="date_birthday" name="date_birthday"
                        placeholder="дд-мм-гггг"
                        defaultValue={employee.date_birthday}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Дата приема на работу</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="date_employment" name="date_employment"
                        placeholder="дд-мм-гггг"
                        defaultValue={employee.date_employment}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Номер медицинской книжки</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="medical_book" name="medical_book"
                        defaultValue={employee.medical_book}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Название организации</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="organization_name" id="organization_name"
                        defaultValue={employee.organization.name}>
                        {organizations.map((organization) => {
                          return (
                            <option key={organization.id} value={organization.name}>
                              {organization.name}
                            </option>
                          );
                        })
                        }
                      </Input>
                    </Col>
                  </FormGroup>
                </CardBlock>
                <CardFooter>
                  <Button type="submit" size="sm" color="success">
                    <i className="fa fa-dot-circle-o"/> Сохранить
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

EditEmployee.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    errors: state.employees.errors,
    employee: state.employees.employee,
    organizations: state.organizations.organizations
  };
};

export default connect(mapStateToProps)(EditEmployee);
