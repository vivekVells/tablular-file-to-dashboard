import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './index.module.scss';

const DashboardWorkflow: FC = () => {
	const { Title } = Typography;

	return (
		<>
			<Title className={styles.textCenter}>
				Tabular File Data To Dashboard
			</Title>
		</>
	);
};

export default DashboardWorkflow;
