import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { Hume } from './components/Hume';
import fields from './reducers';

let store = createStore(fields)

render(
  <Provider store={store}>
    <Hume title='Hume'/>
  </Provider>,
  document.getElementById('react-root')
);

import { updatePreview } from './actions'
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(updatePreview(0, 'hello'))

unsubscribe();
