import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import dataReducer from './reducers/dataReducer'
import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log(err)
    }
}
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        console.log(err)
        return undefined;
    }
}
const persistedState = loadFromLocalStorage();

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

const composeEnhancers = typeof window === 'object' && window.__REconstDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducers, 
    persistedState,
    enhancer);

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;