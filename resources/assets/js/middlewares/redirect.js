export const redirect = (store) => (next) => (action) => {
  if (action.payload.response && action.payload.response.status === 401) {
    history.pushState(
      null,
      null,
      '/#/login'
    );
    window.location.reload();
  }

  if (action.type === 'ROUTING') {
    history.replaceState(
      null,
      null,
      action.payload.nextUrl
    );
  }

  return next(action);
};
