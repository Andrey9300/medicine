import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import promise from 'redux-promise';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {redirect} from './middlewares/redirect';

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunk,
    promise,
    logger,
    redirect
  ))
);
