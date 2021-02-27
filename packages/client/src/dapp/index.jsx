import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, compose, combineReducers } from 'redux'
import './index.css';
import App from './App.jsx';
import * as reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

const app = combineReducers(reducers);
const store = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)(app);

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
