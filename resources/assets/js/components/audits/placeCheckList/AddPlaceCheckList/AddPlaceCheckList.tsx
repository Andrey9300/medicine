import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  addPlaceCheckList,
  fetchPlaceCheckList,
} from '../../../../actions/audit/placeCheckListActions';
import {Card, CardBody, Row, Col} from 'reactstrap';
import {createMarkup} from '../../../../utils/errorsHelper';
import {TState} from '../../../../reducers';
import {IPlaceCheckList} from '../../../../interface/audit/IPlaceCheckList';
import {Header} from './Header';
import {Criterions} from './Criterions';

interface IStateProps {
  placeCheckList: IPlaceCheckList;
  fetched: boolean;
  errors: any;
}

interface IDispatchProps {
  fetchPlaceCheckList: typeof fetchPlaceCheckList;
  addPlaceCheckList: typeof addPlaceCheckList;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  placeCheckListId: number;
}

class AddPlaceCheckListCheckList extends React.PureComponent<IProps> {
  public state: IState = {
    placeCheckListId: null,
  };

  componentDidMount() {
    const {match, fetchPlaceCheckList} = this.props;

    fetchPlaceCheckList(match.params.id);
    this.setState({placeCheckListId: match.params.id});
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {addPlaceCheckList} = this.props;

    addPlaceCheckList(
      document.querySelector('form'),
      this.state.placeCheckListId,
    );
  };

  render() {
    const {placeCheckListId} = this.state;
    const {placeCheckList, errors} = this.props;
    let errorsMessage = null;

    if (!placeCheckList) {
      return (
        <Card>
          <CardBody>
            <Row>
              <Col xs="12" sm="12" md="12" lg="8" xl="8">
                Для проведения аудита{' '}
                <Link to={`/services/audits/place/edit/${placeCheckListId}`}>
                  укажите чек лист
                </Link>
              </Col>
            </Row>
          </CardBody>
        </Card>
      );
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
          <Col xs="12" sm="12" md="12" lg="8" xl="8">
            <Header placeCheckList={placeCheckList} />
          </Col>
          <Col xs="12">
            <Criterions
              placeCheckList={placeCheckList}
              handleSubmit={this.handleSubmit}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    placeCheckList: state.placeCheckLists.placeCheckList,
    fetched: state.placeCheckLists.fetched,
    errors: state.placeCheckLists.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchPlaceCheckList: (id: number) => dispatch(fetchPlaceCheckList(id)),
    addPlaceCheckList: (form: HTMLFormElement, id: number) =>
      dispatch(addPlaceCheckList(form, id)),
  };
};

export const AddPlaceCheckListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPlaceCheckListCheckList);
