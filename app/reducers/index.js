// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import builder from './builder';

const rootReducer = combineReducers({
  counter,
  builder,
  router
});

export default rootReducer;
