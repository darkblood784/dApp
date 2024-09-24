import * as React from 'react';
import ReactDOM from 'react-dom/client';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import './index.css';
import { App } from './App';
import "./i18n";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
            <App></App>
    </React.StrictMode>
);
