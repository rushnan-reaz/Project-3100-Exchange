import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';

const DevTools = process.env.NODE_ENV === 'development' ? DevSupport : React.Fragment;

ReactDOM.render(
    <Provider store={store}>
        <Router> 
            <React.StrictMode>
                <DevTools ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                    <App />
                </DevTools>
            </React.StrictMode>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// Log or send performance data
reportWebVitals();
