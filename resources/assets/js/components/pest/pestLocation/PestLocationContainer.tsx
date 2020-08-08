import React from 'react';
import {connect} from 'react-redux';
import {
  fetchPestLocation,
  deletePestLocation,
  clearPestLocation,
} from '../../../actions/pest/locationActions';
import {TState} from '../../../reducers';
import {
  IPestLocationDispatchProps,
  PestLocationComponent,
} from './PestLocation';

const mapStateToProps = (state: TState) => {
  return {
    pestLocation: state.pestLocation.pestLocation,
    fetched: state.pestLocation.fetched,
    errors: state.pestLocation.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IPestLocationDispatchProps => {
  return {
    clearPestLocation: () => dispatch(clearPestLocation()),
    fetchPestLocation: (id: number) => dispatch(fetchPestLocation(id)),
    deletePestLocation: (id: number) => dispatch(deletePestLocation(id)),
  };
};

export const PestLocationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PestLocationComponent);
