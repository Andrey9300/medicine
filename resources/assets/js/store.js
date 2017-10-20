import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import reducer from './reducers';
import thunk from 'redux-thunk';
const logger = createLogger();

export default createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk, promise, logger),
));
