import { applyMiddleware,compose, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import{reducer as authReducer} from "./Authentication/reducer"
import {reducer as appReducer} from "./App/reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({authReducer ,appReducer})

export const store = legacy_createStore(rootReducer ,composeEnhancers(applyMiddleware(thunk)))