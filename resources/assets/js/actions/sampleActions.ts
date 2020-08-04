import axios from 'axios';
import {getResponseError} from '../utils/errorsHelper';

export function addPlace(formElement: HTMLFormElement = null) {
    return (dispatch: any) => {
        axios
            .post('/places/store', new FormData(formElement))
            .then(() => {
                alert('Помещение успешно создано');
                window.location.reload();
            })
            .catch((errors) => {
                dispatch({
                    payload: getResponseError(errors),
                    type: 'PLACE_ADD_REJECTED',
                });
            });
    };
}

export function editPlace(
    formElement: HTMLFormElement = null,
    legalEntityId: number,
) {
    return (dispatch: any) => {
        axios
            .post(`/places/update/${legalEntityId}`, new FormData(formElement))
            .then(() => {
                alert('Помещение успешно отредактировано');
                history.pushState(null, null, `/services/audits/place/${legalEntityId}`);
                window.location.reload();
            })
            .catch((errors) => {
                dispatch({
                    payload: getResponseError(errors),
                    type: 'PLACE_EDIT_REJECTED',
                });
            });
    };
}

export function fetchPlaces() {
    return (dispatch: any) => {
        axios
            .post('/places')
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'PLACES_FULFILLED',
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'PLACES_REJECTED',
                });
            });
    };
}

export function fetchPlace(id: number) {
    return (dispatch: any) => {
        axios
            .post(`/places/${id}`)
            .then((response) => {
                dispatch({
                    payload: response,
                    type: 'PLACE_FULFILLED',
                });
            })
            .catch((error) => {
                dispatch({
                    payload: error,
                    type: 'PLACE_REJECTED',
                });
            });
    };
}

export function deletePlace(id: number) {
    return () => {
        axios
            .post(`/places/destroy/${id}`)
            .then(() => {
                history.pushState(null, null, '/services/audits/objects');
                window.location.reload();
            })
            .catch((error) => {
                return error;
            });
    };
}

export function clearPlace() {
    return (dispatch: any) => {
        dispatch({
            payload: [],
            type: 'PLACE_CLEAR',
        });
    };
}
