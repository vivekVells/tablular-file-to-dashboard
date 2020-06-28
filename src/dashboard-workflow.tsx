import React, { FC, useState } from 'react';
import { Typography } from 'antd';
import styles from './dashboard-workflow.module.css';
import TabularFileToJson from './tabular-file-to-json';
import DraftInitialPage from './draft-initial-page';

// todo: have to move few state mgmt related stuffs using useContext hook

interface ReviewJSONDataProp {
	pageTitle: string;
	groupings: {
		groupingBy: string;
		groupingItems: { itemTitle: any; items: any; show: boolean }[];
	}[];
}

const DashboardWorkflow: FC = () => {
	const { Title } = Typography;

	const [jsonData, setjsonData] = useState<Array<object>>([]);

	const jsonDataCallBkFn = (data: Array<Object>) => {
		console.log(`jsonDataCallBkFn received: ${JSON.stringify(data)}`);
		setjsonData(data);
	};

	const reviewJsonDataCallBkFn = (data: ReviewJSONDataProp) => {
		console.log(`reviewJsonDataCallBkFn received: ${JSON.stringify(data)}`);
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
						reviewJsonDataCallBkFn={reviewJsonDataCallBkFn}
					/>
				)}
			</div>
		</div>
	);
};

export default DashboardWorkflow;
