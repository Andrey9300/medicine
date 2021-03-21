import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  clearOrganization,
  fetchOrganization,
} from '../../../actions/lmk/organizationActions';
import {fetchCategories} from '../../../actions/lmk/categoryActions';
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
import {editOrganization} from '../../../actions/lmk/organizationActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IOrganization} from '../../../interface/lmk/IOrganization';
import {ICategory} from '../../../interface/lmk/ICategory';
import {TState} from '../../../reducers';

interface IProps {
  dispatch: any;
  match: any;
  errors: any;
  categories: ICategory[];
  organization: IOrganization;
}

interface IState {
  organizationId: number;
}

class EditOrganization extends PureComponent<IProps, IState> {
  state: IState = {
    organizationId: null,
  };

  componentDidMount() {
    const {match} = this.props;
    const organizationId = match.params.id;

    this.props.dispatch(clearOrganization());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchOrganization(organizationId));

    this.setState({organizationId});
  }

  handleSubmit = (event: any) => {
    event.preventDefault();

    this.props.dispatch(
      editOrganization(
        document.querySelector('form'),
        this.state.organizationId,
      ),
    );
  };

  render() {
    const {organization, categories, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!organization) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать организацию</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Должность</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        name="head_position"
                        id="head_position"
                        defaultValue={organization.head_position}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Телефон</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        name="head_phone"
                        id="head_phone"
                        defaultValue={organization.head_phone}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Адрес фактический</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        name="address_fact"
                        defaultValue={organization.address_fact}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Адрес юридический</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        name="address_legal"
                        defaultValue={organization.address_legal}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ОКВЭД</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input name="okved" defaultValue={organization.okved} />
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
                        id="select"
                        defaultValue={organization.category?.id}
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
    organization: state.organizations.organization,
  };
};

export const EditOrganizationContainer = connect(mapStateToProps)(
  EditOrganization,
);
