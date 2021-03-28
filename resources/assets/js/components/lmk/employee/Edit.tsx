import React from 'react';
import {connect} from 'react-redux';
import {
  clearEmployee,
  fetchEmployee,
} from '../../../actions/lmk/employeeActions';
import {fetchOrganizations} from '../../../actions/lmk/organizationActions';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {editEmployee} from '../../../actions/lmk/employeeActions';
import {fetchCategories} from '../../../actions/lmk/categoryActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IOrganization} from '../../../interface/lmk/IOrganization';
import {ICategory} from '../../../interface/lmk/ICategory';
import {IEmployee} from '../../../interface/lmk/IEmployee';
import {TState} from '../../../reducers';

interface IStateProps {
  errors: any;
  organizations: IOrganization[];
  categories: ICategory[];
  employee: IEmployee;
}

interface IDispatchProps {
  clearEmployee: typeof clearEmployee;
  editEmployee: typeof editEmployee;
  fetchOrganizations: typeof fetchOrganizations;
  fetchEmployee: typeof fetchEmployee;
  fetchCategories: typeof fetchCategories;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  employeeId: number;
}

class EditEmployee extends React.PureComponent<IProps, IState> {
  state: IState = {
    employeeId: null,
  };

  handleSubmit = (event: any) => {
    const {editEmployee} = this.props;
    const {employeeId} = this.state;
    event.preventDefault();

    editEmployee(document.querySelector('form'), employeeId);
  };

  componentDidMount() {
    const {
      match,
      clearEmployee,
      fetchCategories,
      fetchEmployee,
      fetchOrganizations,
    } = this.props;
    const employeeId = match.params.id;
    this.setState({employeeId});

    clearEmployee();
    fetchCategories();
    fetchEmployee(employeeId);
    fetchOrganizations();
  }

  render() {
    const {employee, organizations, categories, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
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
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ФИО</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="fio"
                        name="fio"
                        defaultValue={employee.fio}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Дата рождения</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="date_birthday"
                        name="date_birthday"
                        placeholder="дд-мм-гггг"
                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                        defaultValue={employee.date_birthday}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Дата приема на работу</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="date_employment"
                        name="date_employment"
                        placeholder="дд-мм-гггг"
                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                        defaultValue={employee.date_employment}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">
                        Номер медицинской книжки
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="medical_book"
                        name="medical_book"
                        defaultValue={employee.medical_book}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Отдел</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="department"
                        name="department"
                        defaultValue={employee.department}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Должность</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="position"
                        name="position"
                        defaultValue={employee.position}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Категория</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="select"
                        name="category_id"
                        id="category_id"
                        defaultValue={employee.category.id}
                      >
                        {categories.map((category) => {
                          return (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Название организации</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="select"
                        name="organization_name"
                        id="organization_name"
                        defaultValue={employee.organization.name}
                      >
                        {organizations.map((organization) => {
                          return (
                            <option
                              key={organization.id}
                              value={organization.name}
                            >
                              {organization.name}
                            </option>
                          );
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Комментарий</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="textarea"
                        id="comments"
                        name="comments"
                        defaultValue={employee.comments}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="success">
                    <i className="fa fa-dot-circle-o" /> Сохранить
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

const mapStateToProps = (state: TState) => {
  return {
    errors: state.employees.errors,
    employee: state.employees.employee,
    categories: state.categories.categories,
    organizations: state.organizations.organizations,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearEmployee: () => dispatch(clearEmployee()),
    editEmployee: (form: any, id: number) => dispatch(editEmployee(form, id)),
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchEmployee: (id: number) => dispatch(fetchEmployee(id)),
    fetchCategories: () => dispatch(fetchCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee);
