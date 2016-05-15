import { createStore as create, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function createStore (initialState, reducers) {
  return create(
    reducers,
    initialState,
    applyMiddleware(thunk)
  );
}

export default createStore;
