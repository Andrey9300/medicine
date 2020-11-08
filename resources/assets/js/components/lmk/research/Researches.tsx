import {
  addUserResearches,
  fetchUserResearches,
} from '../../../actions/lmk/researchActions';
import React from 'react';
import {connect} from 'react-redux';
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
import {TState} from '../../../reducers';
import {IUserResearches} from '../../../interface/lmk/IResearch';

interface IStateProps {
  userResearches: IUserResearches[];
  errors: any;
}

interface IDispatchProps {
  fetchUserResearches: typeof fetchUserResearches;
  addUserResearches: typeof addUserResearches;
}

interface IProps extends IStateProps, IDispatchProps {}

class ResearchesComponent extends React.PureComponent<IProps> {
  componentDidMount() {
    const {fetchUserResearches} = this.props;

    fetchUserResearches();
  }

  private handleSubmit = (event: any) => {
    const {addUserResearches} = this.props;
    event.preventDefault();

    addUserResearches(document.querySelector('form'));
  };

  render() {
    const {errors, userResearches} = this.props;
    let errorsMessage = null;

    if (!userResearches || !userResearches.length) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="6" md="4">
              <Card className="text-center">
                <CardHeader>Исследований нет</CardHeader>
                <CardBody>
                  <Link to={'/services/lmk/employees/create'}>
                    Добавьте сотрудника
                  </Link>
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
              <Form onSubmit={this.handleSubmit}>
                <CardHeader>
                  <i className="fa fa-heartbeat" aria-hidden="true" />
                  Исследования ({userResearches.length}) Выберите нужные
                  исследования.
                  <Button type="submit" size="sm" color="success pull-right">
                    <i className="fa fa-dot-circle-o" /> Сохранить
                  </Button>
                </CardHeader>
                <CardBody className="card-body">
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
                              defaultChecked={research.check}
                              value={research.id}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="success pull-right">
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
    errors: state.researches.error,
    userResearches: state.researches.userResearches,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchUserResearches: () => dispatch(fetchUserResearches()),
    addUserResearches: (formElement: HTMLFormElement) =>
      dispatch(addUserResearches(formElement)),
  };
};

export const ResearchesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResearchesComponent);
