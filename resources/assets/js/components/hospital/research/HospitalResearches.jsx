import {addHospitalResearches, fetchHospitalResearches} from '../../../actions/hospitalActions';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, CardFooter, Table, Form, Button, Input} from 'reactstrap';

class HospitalResearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitalId: props.idHospital
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchHospitalResearches(this.state.hospitalId));
  }

  handleClick() {
    this.props.dispatch(addHospitalResearches(
      document.querySelector('form'),
      this.state.hospitalId
    ));
  }

  render() {
    const {hospitalResearches} = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" lg="8">
            <Card>
              <CardHeader>
                <i className="fa fa-heartbeat" aria-hidden="true"/>Цены на исследования ({hospitalResearches.length})
                <Button type="submit" size="sm" color="success pull-right" onClick={this.handleClick}>
                  <i className="fa fa-dot-circle-o"/> Сохранить
                </Button>
              </CardHeader>
              <CardBlock className="card-body">
                <Form id="hospitalResearch">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Исследование</th>
                        <th>Цена</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hospitalResearches.map((research) => {
                        return (
                          <tr key={research.id}>
                            <td>{research.research.name}</td>
                            <td>
                              <Input type="text"
                                name={`hospitalResearch[${research.pivot.id}]`}
                                defaultValue={research.price}
                              />
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
                <Button type="submit" size="sm" color="success pull-right" onClick={this.handleClick}>
                  <i className="fa fa-dot-circle-o"/> Сохранить
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

HospitalResearches.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    hospitalResearches: state.hospitals.hospitalResearches,
  };
};

export default connect(mapStateToProps)(HospitalResearches);
