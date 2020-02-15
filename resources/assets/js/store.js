import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import promise from 'redux-promise';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {redirect} from './middlewares/redirect';
import {loadState, saveState} from './utils/localstorage';

const persistedState = loadState();

export const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(applyMiddleware(
    thunk,
    promise,
    logger,
    redirect
  ))
);

store.subscribe(() => {
  saveState({
    users: store.getState().users
  });
});
