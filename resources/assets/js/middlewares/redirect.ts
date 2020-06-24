export const redirect = (store: any) => (next: any) => (action: any) => {
  if (action.payload.response && action.payload.response.status === 401) {
    store.dispatch({
      payload: {
        isAuthenticated: false,
      },
      type: 'LOGOUT_USER_FULFILLED',
    });
    history.pushState(null, null, '/lmk/login');
    window.location.reload();
  }

  if (action.type === 'ROUTING') {
    history.replaceState(null, null, action.payload.nextUrl);
  }

  return next(action);
};
