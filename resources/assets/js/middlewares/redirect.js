import {hashHistory} from 'react-router';

export const redirect = (store) => (next) => (action) => {
    if (action.payload.response && action.payload.response.status === 401) {
        hashHistory.replace('login');
    }

    if (action.type === 'ROUTING') {
        hashHistory[action.payload.method](action.payload.nextUrl);
    }

    return next(action);
};
