import React from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup,
  Label,
} from 'reactstrap';
import {addPestUnit} from '../../../actions/pest/unitActions';
import {createMarkup} from '../../../utils/errorsHelper';
import {TState} from '../../../reducers';

interface IStateProps {
  errors: any;
}

interface IDispatchProps {
  addPestUnit: typeof addPestUnit;
}

interface IProps extends IStateProps, IDispatchProps {}

class NewPestUnit extends React.PureComponent<IProps> {
  handleSubmit = (event: any) => {
    event.preventDefault();
    const {addPestUnit} = this.props;

    addPestUnit(document.querySelector('#pestUnit'));
  };

  render() {
    const {errors} = this.props;
    let errorsMessage = null;

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
          <Col xs="12" md="8">
            <Card>
              <Form
                className="form-horizontal"
                onSubmit={this.handleSubmit}
                id="pestUnit"
              >
                <CardHeader>
                  <i className="fa fa-building" aria-hidden="true" />
                  Добавить информацию об объекте
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Наименование</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="name" required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ФИО менеджера</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="manager" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">
                        Наименование проверяющей организации
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="checkOrganization" />
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
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    addPestUnit: (form: HTMLFormElement) => dispatch(addPestUnit(form)),
  };
};

export const NewPestUnitContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPestUnit);
