import React from 'react';
import {fetchCategories} from './../../actions/categoryActions';
import {connect} from 'react-redux';
import {Row, Col, Button, Card, CardHeader, CardBlock, CardFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import {addOrganization} from '../../actions/organizationActions';

class NewOrganization extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(addOrganization(document.querySelector('form')));
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
    const {categories, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = <div className="alert alert-danger" role="alert">{this.createMarkup()}</div>;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Добавить организацию</CardHeader>
                <CardBlock className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="name" name="name" required/>
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

const mapStateToProps = (state) => {
  return {
    errors: state.organizations.errors,
    categories: state.categories.categories,
    users: state.users.user
  };
};

export const NewOrganizationContainer = connect(mapStateToProps)(NewOrganization);
