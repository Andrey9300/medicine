import React from 'react';
import {connect} from 'react-redux';
import {
  fetchPestControl,
  deletePestControl,
  clearPestControl,
} from '../../../actions/pest/controlActions';
import {TState} from '../../../reducers';
import {IPestControlDispatchProps, PestControlComponent} from './PestControl';

const mapStateToProps = (state: TState) => {
  return {
    pestControl: state.pestControl.pestControl,
    pestControlCriteria: state.pestControl.pestControlCriteria,
    fetched: state.pestControl.fetched,
    errors: state.pestControl.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IPestControlDispatchProps => {
  return {
    clearPestControl: () => dispatch(clearPestControl()),
    fetchPestControl: (id: number) => dispatch(fetchPestControl(id)),
    deletePestControl: (id: number) => dispatch(deletePestControl(id)),
  };
};

export const PestControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PestControlComponent);
