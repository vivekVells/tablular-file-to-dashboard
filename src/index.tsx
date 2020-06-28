import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// importing antd css file
import 'antd/dist/antd.css';
import App from './app';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
