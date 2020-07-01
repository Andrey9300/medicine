import {
  addUserResearches,
  fetchUserResearches,
} from '../../actions/researchActions';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Form,
  Button,
  Input,
} from 'reactstrap';

class Researches extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchUserResearches());
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleClick() {
    this.props.dispatch(addUserResearches(document.querySelector('form')));
  }

  render() {
    const {errors, userResearches} = this.props;
    let errorsMessage = '';

    if (userResearches.length === 0 || userResearches === null) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="6" md="4">
              <Card className="text-center">
                <CardHeader>Исследований нет</CardHeader>
                <CardBody>
                  <Link to={'/services/lmk/employees/create'}>Добавьте сотрудника</Link>
                  <p>
                    На основе категорий сотрудника будут сформированы
                    необходимые исследования
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          Ошибка
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="12" lg="8">
            <Card>
              <CardHeader>
                <i className="fa fa-heartbeat" aria-hidden="true" />
                Исследования ({userResearches.length}) Выберите нужные
                исследования.
                <Button
                  type="submit"
                  size="sm"
                  color="success pull-right"
                  onClick={this.handleClick}
                >
                  <i className="fa fa-dot-circle-o" /> Сохранить
                </Button>
              </CardHeader>
              <CardBody className="card-body">
                <Form>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Категория</th>
                        <th>Исследование</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {userResearches.map((research) => (
                        <tr key={research.id}>
                          <td>{research.category.name}</td>
                          <td>{research.research.name}</td>
                          <td>
                            <Input
                              type="checkbox"
                              name={`research[${research.id}]`}
                              defaultChecked={research.check ? 'checked' : ''}
                              value={research.id}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  size="sm"
                  color="success pull-right"
                  onClick={this.handleClick}
                >
                  <i className="fa fa-dot-circle-o" /> Сохранить
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Researches.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userResearches: PropTypes.array.isRequired,
  errors: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    errors: state.researches.errors,
    userResearches: state.researches.userResearches,
  };
};

export default connect(mapStateToProps)(Researches);
