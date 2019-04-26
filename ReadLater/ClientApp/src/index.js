'use strict';
Object.defineProperty (exports, '__esModule', {value: true});
var React = require ('react');
var ReactDOM = require ('react-dom');
var react_redux_1 = require ('react-redux');
var App_1 = require ('./containers/App');
var store_1 = require ('./store/store');
ReactDOM.render (
  React.createElement (
    react_redux_1.Provider,
    {store: store_1.Store},
    React.createElement (App_1.default, null)
  ),
  document.getElementById ('root')
);
