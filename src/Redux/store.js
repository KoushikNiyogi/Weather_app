import {legacy_createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk';
import reducer from './UserReduce/Reducer'; // Import your userReducer

// Reducer
const rootReducer = combineReducers({
    user: reducer,
  });

// Apply middleware (redux-thunk) and create the store
const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
