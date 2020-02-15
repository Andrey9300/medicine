export const redirect = (store) => (next) => (action) => {
    if (action.payload.response && action.payload.response.status === 401) {
        history.replaceState(null, null, '/#/login');
    }

    if (action.type === 'ROUTING') {
        history.replaceState(null, null, action.payload.nextUrl);
    }

    return next(action);
};
