import React from 'react';
import {connect} from 'react-redux';
import {fetchUnit, deleteUnit} from '../../../actions/audit/unitActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';
import {IUnit} from '../../../interface/audit/IUnit';

interface IStateProps {
  unit: IUnit;
  errors: any;
}

interface IDispatchProps {
  fetchUnit: typeof fetchUnit;
  deleteUnit: typeof deleteUnit;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

class Unit extends React.PureComponent<IProps> {
  componentDidMount() {
    const {match, fetchUnit} = this.props;

    fetchUnit(match.params.id);
  }

  handleBtnDelete = (id: number, event: any) => {
    event.preventDefault();
    const {deleteUnit} = this.props;

    deleteUnit(id);
  };

  render() {
    const {unit, errors} = this.props;
    let errorsMessage = null;

    if (!unit) {
      return null;
    }

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <Card>
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Подразделения
                <Link
                  to={`/services/audits/unit/edit/${unit.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
                <span
                  className="pull-right"
                  onClick={(event) => this.handleBtnDelete(unit.id, event)}
                >
                  <i className="fa fa-trash" />
                </span>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td>Наименование:</td>
                      <td>{unit.name}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    unit: state.units.unit,
    errors: state.units.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchUnit: (id: number) => dispatch(fetchUnit(id)),
    deleteUnit: (id: number) => dispatch(deleteUnit(id)),
  };
};

export const UnitContainer = connect(mapStateToProps, mapDispatchToProps)(Unit);
