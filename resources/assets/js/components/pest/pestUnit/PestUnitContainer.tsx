import React from 'react';
import {connect} from 'react-redux';
import {
  fetchPestUnitCurrent,
  deletePestUnit,
  clearPestUnit,
} from '../../../actions/pest/unitActions';
import {TState} from '../../../reducers';
import {IPestUnitDispatchProps, PestUnitComponent} from './PestUnit';

const mapStateToProps = (state: TState) => {
  return {
    pestUnit: state.pestUnit.pestUnit,
    fetched: state.pestUnit.fetched,
    errors: state.pestUnit.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IPestUnitDispatchProps => {
  return {
    clearPestUnit: () => dispatch(clearPestUnit()),
    fetchPestUnitCurrent: () => dispatch(fetchPestUnitCurrent()),
    deletePestUnit: (id: number) => dispatch(deletePestUnit(id)),
  };
};

export const PestUnitContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PestUnitComponent);
