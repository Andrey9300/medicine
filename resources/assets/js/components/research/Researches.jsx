import {addUserResearches, fetchUserResearches} from '../../actions/researchActions';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBlock, CardFooter, Table, Form, Button, Input} from 'reactstrap';

class Researches extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchUserResearches());
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleClick() {
    this.props.dispatch(addUserResearches(document.querySelector('form')));
  }

  render() {
    const {user, userResearches, errors} = this.props;
    let buttonSave = '';
    let errorsMessage = '';

    if (userResearches === null) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" sm="6" md="4">
              <Card className="text-center">
                <CardHeader>
                                    Исследований нет
                </CardHeader>
                <CardBlock>
                  <Link to={'/organizations/create'}>
                                        Добавьте организацию
                  </Link>
                  <p>На основе категорий организаций будут сформированы необходимые исследования</p>
                </CardBlock>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }

    if (user && user.role === 'admin') {
      buttonSave =
                <Button type="submit" size="sm" color="success pull-right" onClick={this.handleClick}>
                  <i className="fa fa-dot-circle-o"/> Сохранить
                </Button>;
    }

    if (errors) {
      errorsMessage =
                <div className="alert alert-danger" role="alert">
                  <div dangerouslySetInnerHTML={this.createMarkup()} />
                </div>;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="12" lg="8">
            <Card>
              <CardHeader>
                <i className="fa fa-heartbeat" aria-hidden="true"/>Исследования
                                ({userResearches.length})
                {buttonSave}
              </CardHeader>
              <CardBlock className="card-body">
                <Form>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Категория</th>
                        <th>Исследование</th>
                        <th/>
                      </tr>
                    </thead>
                    <tbody>
                      {userResearches.map((research) => {
                        let researchCheckBox = '';

                        if (user && user.role === 'admin') {
                          let check = '';

                          if (research.check) {
                            check = 'checked';
                          }

                          researchCheckBox =
                                                        <Input type="checkbox"
                                                          name={`research[${research.id}]`}
                                                          defaultChecked={check}
                                                          value={research.id}
                                                        />;
                        }

                        return (
                          <tr key={research.id}>
                            <td>{research.category.name}</td>
                            <td>{research.research.name}</td>
                            <td>
                              {researchCheckBox}
                            </td>
                          </tr>
                        );
                      })
                      }
                    </tbody>
                  </Table>
                </Form>
              </CardBlock>
              <CardFooter>
                {buttonSave}
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
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    errors: state.researches.errors,
    userResearches: state.researches.userResearches,
    user: state.users.user
  };
};

export default connect(mapStateToProps)(Researches);
