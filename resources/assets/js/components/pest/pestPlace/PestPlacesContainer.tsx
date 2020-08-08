import React from 'react';
import {connect} from 'react-redux';
import {fetchPestPlacesForLocation} from '../../../actions/pest/placeActions';
import {TState} from '../../../reducers';
import {IPestPlacesDispatchProps, PestPlacesComponent} from './PestPlaces';

const mapStateToProps = (state: TState) => {
  return {
    pestPlaces: state.pestPlace.pestPlaces,
    fetched: state.pestPlace.fetched,
    errors: state.pestPlace.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IPestPlacesDispatchProps => {
  return {
    fetchPestPlacesForLocation: (locationId: number) =>
      dispatch(fetchPestPlacesForLocation(locationId)),
  };
};

export const PestPlacesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PestPlacesComponent);
