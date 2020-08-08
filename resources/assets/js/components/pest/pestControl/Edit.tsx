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
import {IPestControl} from '../../../interface/pest/IPestControl';
import {TState} from '../../../reducers';

interface IStateProps {
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
    const {pestControl, errors} = this.props;
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
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать точку контроля</CardHeader>
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
                        defaultValue={pestControl.created_at}
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
    errors: state.pestControl.errors,
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
