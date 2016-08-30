import React from 'react';
import 'babel-polyfill';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { Hume } from './components/Hume';
import rootReducer from './reducers';

let store = createStore(rootReducer, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension && window.devToolsExtension()));

render(
  <Provider store={store}>
    <Hume title='Hume'/>
  </Provider>,
  document.getElementById('react-root')
);

import { updatePreview,  updateStyles, fetchStyles, configureState } from './actions'
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// var data = require('!json!./config.json')
// console.log('store config', data)
// store.dispatch(configureState(data))
// console.log('post configure', store.getState())
// store.dispatch(fetchStyles()).then(() =>
//   console.log('post fetch', store.getState())
// )

unsubscribe();
