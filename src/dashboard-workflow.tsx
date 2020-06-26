import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './dashboard-workflow.module.scss';
import TabularFileToJson from './tabular-file-to-json';

const DashboardWorkflow: FC = () => {
	const { Title } = Typography;

	return (
		<div style={{ marginLeft: '32px', marginTop: '32px' }}>
			<Title className={styles.textCenter}>
				Tabular File Data To Dashboard
			</Title>

			<div>
				<TabularFileToJson />
			</div>
		</div>
	);
};

export default DashboardWorkflow;
