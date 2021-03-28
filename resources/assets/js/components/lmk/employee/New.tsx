import React from 'react';
import {connect} from 'react-redux';
import {fetchOrganizations} from '../../../actions/lmk/organizationActions';
import {addEmployee} from '../../../actions/lmk/employeeActions';
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
import {fetchCategories} from '../../../actions/lmk/categoryActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IOrganization} from '../../../interface/lmk/IOrganization';
import {ICategory} from '../../../interface/lmk/ICategory';
import {TState} from '../../../reducers';

interface IStateProps {
  errors: any;
  organizations: IOrganization[];
  categories: ICategory[];
}

interface IDispatchProps {
  addEmployee: typeof addEmployee;
  fetchCategories: typeof fetchCategories;
  fetchOrganizations: typeof fetchOrganizations;
}

interface IProps extends IStateProps, IDispatchProps {}

class NewEmployee extends React.PureComponent<IProps> {
  componentDidMount() {
    const {fetchCategories, fetchOrganizations} = this.props;
    fetchCategories();
    fetchOrganizations();
  }

  handleSubmit = (event: any) => {
    const {addEmployee} = this.props;
    event.preventDefault();
    addEmployee(document.querySelector('form'));
  };

  render() {
    const {organizations, categories, errors} = this.props;
    let errorsMessage;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <div>
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Добавить сотрудника</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ФИО</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="name" name="fio" required />
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
                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                        placeholder="дд-мм-гггг"
                        required
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
                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                        placeholder="дд-мм-гггг"
                        required
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
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Отдел</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="department" name="department" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Должность</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="position" name="position" />
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
                        required
                      >
                        <option />
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
                        required
                      >
                        <option />
                        {organizations.map((organization) => (
                          <option
                            key={organization.id}
                            value={organization.name}
                          >
                            {organization.name}
                          </option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Комментарий</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" id="comments" name="comments" />
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
    organizations: state.organizations.organizations,
    categories: state.categories.categories,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    addEmployee: (form: any) => dispatch(addEmployee(form)),
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchCategories: () => dispatch(fetchCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEmployee);
