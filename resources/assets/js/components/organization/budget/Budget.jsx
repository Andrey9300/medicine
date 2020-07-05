import React from 'react';
import {connect} from 'react-redux';
import {
  fetchOrganization,
  deleteOrganization,
} from '../../../actions/lmk/organizationActions';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {fetchHospitals} from '../../../actions/lmk/hospitalActions';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';

class Budget extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      organizationId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchOrganization(this.state.organizationId));
    this.props.dispatch(fetchHospitals());
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deleteOrganization(id));
  }

  render() {
    const {organization} = this.props;
    const {errors} = this.state;
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
      <div>
        {errorsMessage}
        <div className="animated fadeIn">
          <Row>
            <Col xs="6" sm="6" md="6">
              <Card>
                <CardHeader>
                  <i className="fa fa-building-o" aria-hidden="true" />«
                  {organization.name}»
                </CardHeader>
                <CardBody className="card-body">
                  <Table responsive>
                    <tbody>
                      <tr>
                        <td>Менеджер:</td>
                        <td>{organization.head_fio}</td>
                      </tr>
                      <tr>
                        <td>E-mail менеджера: </td>
                        <td>{organization.head_email}</td>
                      </tr>
                      <tr>
                        <td>Категория:</td>
                        <td>{organization.category.name}</td>
                      </tr>
                      <tr>
                        <td>
                          <Link
                            to={`/services/lmk/organizations/edit/${organization.id}`}
                            className="btn btn-success btn-xs pull-left"
                          >
                            Редактировать
                          </Link>
                        </td>
                        <td>
                          <form
                            id={`form_${organization.id}`}
                            className="pull-left"
                            method="post"
                          >
                            <input
                              type="hidden"
                              name="organization_id"
                              value={organization.id}
                            />
                            <a
                              className="btn btn-danger btn-xs"
                              onClick={(event) =>
                                this.handleBtnDelete(organization.id, event)
                              }
                              href="#"
                              id={organization.id}
                            >
                              Удалить
                            </a>
                          </form>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Budget.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    organization: state.organizations.organization,
    hospitals: state.hospitals.hospitals,
  };
};

export default connect(mapStateToProps)(Budget);
