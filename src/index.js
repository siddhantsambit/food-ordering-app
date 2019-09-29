import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import Controller from './screens/Controller';

ReactDOM.render(
    <div>
        < Controller />
    </div>,
    document.getElementById('root')
);

serviceWorker.unregister();
