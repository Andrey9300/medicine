export const redirect = (store) => (next) => (action) => {
    if (action.payload.response && action.payload.response.status === 401) {
        history.replace(null, null, 'login');
    }

    if (action.type === 'ROUTING') {
        history.replace(null, null, action.payload.nextUrl);
    }

    return next(action);
};
