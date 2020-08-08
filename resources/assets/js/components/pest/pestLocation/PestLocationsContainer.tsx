import React from 'react';
import {connect} from 'react-redux';
import {fetchPestLocations} from '../../../actions/pest/locationActions';
import {TState} from '../../../reducers';
import {
  IPestLocationsDispatchProps,
  PestLocationsComponent,
} from './PestLocations';

const mapStateToProps = (state: TState) => {
  return {
    pestUnit: state.pestUnit.pestUnit,
    pestLocations: state.pestLocation.pestLocations,
    fetched: state.pestLocation.fetched,
    errors: state.pestLocation.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IPestLocationsDispatchProps => {
  return {
    fetchPestLocations: () => dispatch(fetchPestLocations()),
  };
};

export const PestLocationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PestLocationsComponent);
