import React from 'react';
import {connect} from 'react-redux';
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
import {editUnit, clearUnit, fetchUnit} from '../../../actions/audit/unitActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';
import {IUnit} from '../../../interface/audit/IUnit';

interface IStateProps {
  unit: IUnit;
  errors: any;
}

interface IDispatchProps {
  clearUnit: typeof clearUnit;
  fetchUnit: typeof fetchUnit;
  editUnit: typeof editUnit;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  unitId: number;
}

class EditUnit extends React.PureComponent<IProps> {
  public state: IState = {
    unitId: null,
  };

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {unitId} = this.state;
    const {editUnit} = this.props;

    editUnit(document.querySelector('form'), unitId);
  };

  componentDidMount() {
    const {match, clearUnit, fetchUnit} = this.props;

    this.setState({unitId: match.params.id});
    clearUnit();
    fetchUnit(match.params.id);
  }

  render() {
    const {unit, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!unit) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать критерий</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={unit.name}
                      />
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

const mapStateToProps = (state: TState) => {
  return {
    errors: state.units.errors,
    unit: state.units.unit,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearUnit: () => dispatch(clearUnit()),
    fetchUnit: (id: number) => dispatch(fetchUnit(id)),
    editUnit: (form: HTMLFormElement, id: number) =>
      dispatch(editUnit(form, id)),
  };
};

export const EditUnitContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUnit);
