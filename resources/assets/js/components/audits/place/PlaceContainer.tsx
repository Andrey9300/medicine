import React from 'react';
import {connect} from 'react-redux';
import {
  fetchPlace,
  deletePlace,
  clearPlace,
} from '../../../actions/audit/placeActions';
import {TState} from '../../../reducers';
import {fetchPlaceCheckList} from '../../../actions/audit/placeCheckListActions';
import {IPlaceDispatchProps, PlaceComponent} from "./Place";

const mapStateToProps = (state: TState) => {
  return {
    place: state.places.place,
    placeCheckList: state.placeCheckLists.placeCheckList,
    fetched: state.places.fetched,
    errors: state.places.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IPlaceDispatchProps => {
  return {
    clearPlace: () => dispatch(clearPlace()),
    fetchPlace: (id: number) => dispatch(fetchPlace(id)),
    deletePlace: (id: number) => dispatch(deletePlace(id)),
    fetchPlaceCheckList: (id: number) => dispatch(fetchPlaceCheckList(id)),
  };
};

export const PlaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaceComponent);
