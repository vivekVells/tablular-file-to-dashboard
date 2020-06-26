import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Adapter from './adapter';

// importing antd css file
import 'antd/dist/antd.css';

ReactDOM.render(
	<React.StrictMode>
		<Adapter />
	</React.StrictMode>,
	document.getElementById('root')
);
