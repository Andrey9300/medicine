import axios from 'axios';

export function fetchGroupCriterions() {
  return (dispatch: any) => {
    axios
      .post('/groupCriterions')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'GROUP_CRITERIONS_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'GROUP_CRITERIONS_REJECTED',
        });
      });
  };
}
