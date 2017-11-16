import axios from 'axios';

/**
 *
 * @returns {function(*)}
 */
export function fetchRegions() {
    return (dispatch) => {
        axios.post('/regions')
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'REGIONS_FULFILLED'
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'REGIONS_REJECTED'
                });
            });
    };
}
