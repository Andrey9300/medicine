import {
  addHospitalResearches,
  fetchHospitalResearches,
} from '../../../../actions/lmk/hospitalActions';
import React from 'react';
import {connect} from 'react-redux';
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
import {TState} from '../../../../reducers';

interface IState {
  hospitalId: number;
}

interface IStateProps {
  hospitalResearches: any;
}

interface IDispatchProps {
  fetchHospitalResearches: typeof fetchHospitalResearches;
  addHospitalResearches: typeof addHospitalResearches;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

class HospitalResearches extends React.PureComponent<IProps, IState> {
  state: IState = {
    hospitalId: null,
  };

  componentDidMount() {
    const {match} = this.props;
    const hospitalId = match.params.idHospital;

    this.setState({hospitalId});
    fetchHospitalResearches(hospitalId);
  }

  handleClick = () => {
    const {addHospitalResearches} = this.props;

    addHospitalResearches(
      document.querySelector('form'),
      this.state.hospitalId,
    );
  };

  render() {
    const {hospitalResearches} = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" lg="8">
            <Card>
              <CardHeader>
                <i className="fa fa-heartbeat" aria-hidden="true" />
                Цены на исследования ({hospitalResearches.length})
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
                <Form id="hospitalResearch">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Исследование</th>
                        <th>Цена</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hospitalResearches.map((research: any) => {
                        return (
                          <tr key={research.id}>
                            <td>{research.research.name}</td>
                            <td>
                              <Input
                                type="text"
                                name={`hospitalResearch[${research.pivot.id}]`}
                                defaultValue={research.price}
                              />
                            </td>
                          </tr>
                        );
                      })}
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

const mapStateToProps = (state: TState) => {
  return {
    hospitalResearches: state.hospitals.hospitalResearches,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchHospitalResearches: (id: number) =>
      dispatch(fetchHospitalResearches(id)),
    addHospitalResearches: (form: any, id: number) =>
      dispatch(addHospitalResearches(form, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HospitalResearches);
