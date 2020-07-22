import {fetchCriterions} from '../../../actions/audit/criterionActions';
import React from 'react';
import {connect} from 'react-redux';
import {TState} from '../../../reducers';
import {Criterions, IDispatchProps} from "./Criterions";

const mapStateToProps = (state: TState) => {
  return {
    criterions: state.criterions.criterions,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchCriterions: () => dispatch(fetchCriterions()),
  };
};

export const CriterionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Criterions);
