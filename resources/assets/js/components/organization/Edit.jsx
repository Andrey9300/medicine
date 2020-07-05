import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearOrganization, fetchOrganization} from '../../actions/lmk/organizationActions';
import {fetchCategories} from '../../actions/lmk/categoryActions';
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
import {editOrganization} from '../../actions/lmk/organizationActions';
import {createMarkup} from '../../utils/errorsHelper';

class EditOrganization extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      organizationId: props.match.params.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      editOrganization(
        document.querySelector('form'),
        this.state.organizationId,
      ),
    );
  }

  componentDidMount() {
    this.props.dispatch(clearOrganization());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchOrganization(this.state.organizationId));
  }

  render() {
    const {organization, categories, errors} = this.props;
    let errorsMessage = '';

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
                        type="input"
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
                        type="input"
                        name="head_phone"
                        id="head_phone"
                        defaultValue={organization.head_phone}
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
                        id="select"
                        defaultValue={organization.category.id}
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

EditOrganization.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  errors: PropTypes.array,
  categories: PropTypes.array,
  organization: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    errors: state.organizations.errors,
    categories: state.categories.categories,
    organization: state.organizations.organization,
  };
};

export default connect(mapStateToProps)(EditOrganization);
