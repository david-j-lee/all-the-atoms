import React from 'react';
import { render } from 'react-dom';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

render(<App />, document.getElementById('root'));
registerServiceWorker();
