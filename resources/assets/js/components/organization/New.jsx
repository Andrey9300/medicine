import React from 'react';
import {fetchCategories} from './../../actions/categoryActions';
import {connect} from 'react-redux';
import {Row, Col, Button, Card, CardHeader, CardBlock, CardFooter, Form, FormGroup, FormText, Label, Input} from 'reactstrap';
import {addOrganization} from '../../actions/organizationActions';

class NewOrganization extends React.Component {
  constructor() {
    super();
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
    const {categories, errors} = this.props;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = <div className="alert alert-danger" role="alert">
        <div dangerouslySetInnerHTML={this.createMarkup()} />
      </div>;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>
                                    Добавить организацию
                </CardHeader>
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

export default connect(mapStateToProps)(NewOrganization);
