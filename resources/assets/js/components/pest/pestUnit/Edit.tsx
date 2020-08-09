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
import {
  clearPestUnit,
  fetchPestUnitCurrent,
  editPestUnitCurrent,
} from '../../../actions/pest/unitActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {IPestUnit} from '../../../interface/pest/IPestUnit';
import {TState} from '../../../reducers';

interface IStateProps {
  pestUnit: IPestUnit;
  errors: any;
}

interface IDispatchProps {
  clearPestUnit: typeof clearPestUnit;
  fetchPestUnitCurrent: typeof fetchPestUnitCurrent;
  editPestUnitCurrent: typeof editPestUnitCurrent;
}

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
  pestUnitId: number;
}

class EditPestUnit extends React.PureComponent<IProps, IState> {
  componentDidMount() {
    const {clearPestUnit, fetchPestUnitCurrent} = this.props;

    clearPestUnit();
    fetchPestUnitCurrent();
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {editPestUnitCurrent} = this.props;

    editPestUnitCurrent(document.querySelector('form'));
  };

  render() {
    const {pestUnit, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!pestUnit) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать объект</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="name"
                        defaultValue={pestUnit.name}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ФИО менеджера</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="manager"
                        defaultValue={pestUnit.manager}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">
                        Наименование проверяющей организации
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="checkOrganization"
                        defaultValue={pestUnit.check_organization}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Файлы</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {pestUnit.files.map((file, index) => (
                        <>
                          <a href={file.link} key={index} target="_blank">
                            {file.name}
                          </a>
                          <br />
                        </>
                      ))}
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
    errors: state.pestUnit.errors,
    pestUnit: state.pestUnit.pestUnit,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearPestUnit: () => dispatch(clearPestUnit()),
    fetchPestUnitCurrent: () => dispatch(fetchPestUnitCurrent()),
    editPestUnitCurrent: (form: HTMLFormElement) =>
      dispatch(editPestUnitCurrent(form)),
  };
};

export const EditPestUnitContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPestUnit);
