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
  clearPestControl,
  fetchPestControl,
  editPestControl,
} from '../../../actions/pest/controlActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {
  IPestControl,
  IPestControlCriterion,
} from '../../../interface/pest/IPestControl';
import {TState} from '../../../reducers';
import {CriteriaListEdit} from './CriteriaListEdit';

interface IStateProps {
  pestControlCriteria: IPestControlCriterion[];
  pestControl: IPestControl;
  errors: any;
}

interface IDispatchProps {
  clearPestControl: typeof clearPestControl;
  fetchPestControl: typeof fetchPestControl;
  editPestControl: typeof editPestControl;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  pestControlId: number;
}

class EditPestControl extends React.PureComponent<IProps, IState> {
  public state: IState = {
    pestControlId: null,
  };

  componentDidMount() {
    const {match, clearPestControl, fetchPestControl} = this.props;

    clearPestControl();
    fetchPestControl(match.params.id);

    this.setState({pestControlId: match.params.id});
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {pestControlId} = this.state;
    const {editPestControl} = this.props;

    editPestControl(document.querySelector('form'), pestControlId);
  };

  render() {
    const {pestControl, pestControlCriteria, errors} = this.props;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!pestControl) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="8">
            <Form className="form-horizontal" onSubmit={this.handleSubmit}>
              <Card>
                <CardHeader>Редактировать точку контроля</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Дата</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {pestControl.created_at}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Комментарий</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="comment"
                        placeholder="Введите комментарий"
                        defaultValue={pestControl.comment}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="success">
                    <i className="fa fa-dot-circle-o" /> Сохранить
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>Редактировать результат</CardHeader>
                <CardBody>
                  <Row
                    style={{
                      borderTop: '1px solid #c2cfd6',
                      padding: '12px 0',
                      textAlign: 'center',
                    }}
                  >
                    <Col xs="2">Точка контроля</Col>
                    <Col xs="3">Состояние точки контроля</Col>
                    <Col xs="4">Учет численности</Col>
                    <Col xs="3">Замена ловушки</Col>
                  </Row>
                  {pestControlCriteria.map((pestControlCriterion, index) => (
                    <CriteriaListEdit
                      key={index}
                      pestControlCriterion={pestControlCriterion}
                      index={index}
                    />
                  ))}
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    errors: state.pestControl.errors,
    pestControlCriteria: state.pestControl.pestControlCriteria,
    pestControl: state.pestControl.pestControl,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearPestControl: () => dispatch(clearPestControl()),
    fetchPestControl: (id: number) => dispatch(fetchPestControl(id)),
    editPestControl: (form: HTMLFormElement, id: number) =>
      dispatch(editPestControl(form, id)),
  };
};

export const EditPestControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPestControl);
