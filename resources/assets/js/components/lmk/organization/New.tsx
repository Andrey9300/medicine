import React, {PureComponent} from 'react';
import {fetchCategories} from '../../../actions/lmk/categoryActions';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {addOrganization} from '../../../actions/lmk/organizationActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IEmployee} from '../../../interface/lmk/IEmployee';
import {ICategory} from '../../../interface/lmk/ICategory';
import {TState} from '../../../reducers';

interface IProps {
  dispatch: any;
  errors: any;
  categories: ICategory[];
}

interface IState {
  organizationId: number;
  employeesAttention: IEmployee[];
  researchesEnds: number;
  researchesExpired: number;
}

class NewOrganization extends PureComponent<IProps, IState> {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.dispatch(addOrganization(document.querySelector('form')));
  };

  render() {
    const {categories, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Добавить организацию</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="name" name="name" required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Должность менеджера</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="head_position"
                        name="head_position"
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Телефон менеджера</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="head_phone"
                        name="head_phone"
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Адрес фактический</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input name="address_fact" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Адрес юридический</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input name="address_legal" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ОКВЭД</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input name="okved" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Категория</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="category_id" id="category">
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
    errors: state.organizations.errors,
    categories: state.categories.categories,
  };
};

export const NewOrganizationContainer = connect(mapStateToProps)(
  NewOrganization,
);
