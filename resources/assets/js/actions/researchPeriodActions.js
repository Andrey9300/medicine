import axios from 'axios';

/**
 * Список категорий
 *
 * @returns {function(*)}
 */
export function fetchPeriods() {
    return (dispatch) => {
        axios.post('/researchPeriods')
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'RESEARCH_PERIODS_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'RESEARCH_PERIODS_REJECTED'
                });
            });
    };
}
