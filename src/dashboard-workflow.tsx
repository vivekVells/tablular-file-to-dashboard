import React, { FC, useState } from 'react';
import { Typography } from 'antd';
import styles from './dashboard-workflow.module.css';
import TabularFileToJson from './tabular-file-to-json';
import DraftInitialPage, {
	ReviewJSONDataGroupingsProp,
} from './draft-initial-page';
import ReviewPage from './review-page';
import ReviewTable from './review-table';

// todo: have to move few state mgmt related stuffs using useContext hook

// export interface ReviewJSONDataProp {
// 	pageTitle: string;
// 	groupings: {
// 		groupingBy: string;
// 		groupingItems: { itemTitle: string; items: any; show: boolean }[];
// 	}[];
// }

export interface ReviewJSONDataProp extends ReviewJSONDataGroupingsProp {
	pageTitle: string;
}

const DashboardWorkflow: FC = () => {
	const { Title } = Typography;

	const [jsonData, setjsonData] = useState<Array<object>>([]);
	const [showReviewPage, setShowReviewPage] = useState<Boolean>(false);
	const [reviewPageJSON, setReviewPageJSON] = useState<ReviewJSONDataProp>({
		pageTitle: '',
		groupings: [],
	});

	const jsonDataCallBkFn = (data: Array<Object>) => {
		console.log(`jsonDataCallBkFn received: ${JSON.stringify(data)}`);
		setjsonData(data);
		setShowReviewPage(false);
	};

	const reviewJsonDataCallBkFn = (data: ReviewJSONDataProp) => {
		setReviewPageJSON(data);
		console.log(`reviewJsonDataCallBkFn received: ${JSON.stringify(data)}`);
		setShowReviewPage(true);
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

			<div>
				{showReviewPage && <ReviewPage reviewPageJSON={reviewPageJSON} />}
			</div>
		</div>
	);
};

export default DashboardWorkflow;
