import React from 'react';
import {connect} from 'react-redux';
import {
  fetchPestPlace,
  deletePestPlace,
  clearPestPlace,
} from '../../../actions/pest/placeActions';
import {TState} from '../../../reducers';
import {IPestPlaceDispatchProps, PestPlaceComponent} from './PestPlace';

const mapStateToProps = (state: TState) => {
  return {
    pestPlace: state.pestPlace.pestPlace,
    fetched: state.pestPlace.fetched,
    errors: state.pestPlace.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IPestPlaceDispatchProps => {
  return {
    clearPestPlace: () => dispatch(clearPestPlace()),
    fetchPestPlace: (id: number) => dispatch(fetchPestPlace(id)),
    deletePestPlace: (id: number) => dispatch(deletePestPlace(id)),
  };
};

export const PestPlaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PestPlaceComponent);
