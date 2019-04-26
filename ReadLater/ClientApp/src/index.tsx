import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { Store } from "./store/store";

ReactDOM.render( 
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);