"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var RootReducer = require("../reducers/root-reducer");
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
exports.Store = redux_1.createStore(RootReducer.reducer, RootReducer.initialState, composeEnhancers(redux_1.applyMiddleware(redux_thunk_1.default)));
//# sourceMappingURL=store.js.map