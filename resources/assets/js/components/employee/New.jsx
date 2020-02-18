import React from 'react';
import PropTypes from 'prop-types';
import {fetchOrganizations} from './../../actions/organizationActions';
import {addEmployee} from './../../actions/employeeActions';
import {connect} from 'react-redux';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, Label, Input} from 'reactstrap';
import {fetchCategories} from '../../actions/categoryActions';

class NewEmployee extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchOrganizations());
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(addEmployee(document.querySelector('form')));
  }

  createMarkup() {
    const {errors} = this.props;

    return Object.keys(errors).map((item) => {
      return errors[item].map((value, index) => {
        return <p key={index}>{value}</p>;
      });
    });
  }

  render() {
    const {organizations, categories, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = <div className="alert alert-danger" role="alert">{this.createMarkup()}</div>;
    }

    return (
      <div>
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Добавить сотрудника</CardHeader>
                <CardBlock className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ФИО</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="name" name="fio" required/>
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
                      <Label htmlFor="text-input">Номер медицинской книжки</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="medical_book" name="medical_book"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Должность</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="position" name="position"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Категория</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="category_id" id="category_id" required>
                        <option />
                        {categories.map((category) => {
                          return (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })
                        }
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Название организации</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="organization_name" id="organization_name" required>
                        <option />
                        {organizations.map((organization) => (
                          <option key={organization.id} value={organization.name}>
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
                      <Input type="textarea" id="comments" name="comments"/>
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

NewEmployee.propTypes = {
  router: PropTypes.object,
  categories: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    errors: state.employees.errors,
    organizations: state.organizations.organizations,
    categories: state.categories.categories
  };
};

export default connect(mapStateToProps)(NewEmployee);
