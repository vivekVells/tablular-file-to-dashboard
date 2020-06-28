import React, { FC, useState } from 'react';
import { Typography } from 'antd';
import styles from './dashboard-workflow.module.css';
import TabularFileToJson from './tabular-file-to-json';
import DraftInitialPage from './draft-initial-page';

// todo: have to move these to context

const DashboardWorkflow: FC = () => {
	const { Title } = Typography;

	const [jsonData, setjsonData] = useState<Array<object>>([]);

	const jsonDataCallBkFn = (data: Array<Object>) => {
		console.log(`jsonDataCallBkFn received: ${JSON.stringify(data)}`);
		setjsonData(data);
	};

	const finalJsonDataCallBkFn = (data: Array<Object>) => {
		console.log(`finalJsonDataCallBkFn received: ${JSON.stringify(data)}`);
	};

	return (
		<div style={{ margin: '32px' }}>
			<Title className={styles.textCenter}>
				Tabular File Data To Dashboard
			</Title>

			<div>
				<TabularFileToJson jsonDataCallBkFn={jsonDataCallBkFn} />
			</div>

			<div>
				{jsonData.length > 1 && (
					<DraftInitialPage
						jsonData={jsonData}
						finalJsonDataCallBkFn={finalJsonDataCallBkFn}
					/>
				)}
			</div>
		</div>
	);
};

export default DashboardWorkflow;
