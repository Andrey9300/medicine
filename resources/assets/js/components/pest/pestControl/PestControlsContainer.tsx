import React from 'react';
import {connect} from 'react-redux';
import {fetchPestControlsForLocation} from '../../../actions/pest/controlActions';
import {TState} from '../../../reducers';
import {IPestControlsDispatchProps, PestControlsComponent} from './PestControls';

const mapStateToProps = (state: TState) => {
  return {
    pestControls: state.pestControl.pestControls,
    fetched: state.pestControl.fetched,
    errors: state.pestControl.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IPestControlsDispatchProps => {
  return {
    fetchPestControlsForLocation: (locationId: number) =>
      dispatch(fetchPestControlsForLocation(locationId)),
  };
};

export const PestControlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PestControlsComponent);
