import axios from 'axios';

/**
 * Список категорий
 *
 * @returns {function(*)}
 */
export function fetchCategories() {
  return (dispatch) => {
    axios
      .post('/categories')
      .then((response) => {
        dispatch({
          payload: response,
          type: 'CATEGORIES_FULFILLED',
        });
      })
      .catch((error) => {
        dispatch({
          payload: error,
          type: 'CATEGORIES_REJECTED',
        });
      });
  };
}
