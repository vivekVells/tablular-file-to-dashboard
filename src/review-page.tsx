import React, { FC } from 'react';
import { ReviewJSONDataProp } from './dashboard-workflow';
import Title from 'antd/lib/typography/Title';
import ReviewTable from './review-table';

interface ReviewPageProp {
	reviewPageJSON: ReviewJSONDataProp;
}

const ReviewPage: FC<ReviewPageProp> = ({ reviewPageJSON }) => {
	return (
		<div style={{ margin: 32 }}>
			<div>
				<Title style={{ textAlign: 'center' }}>Review Page</Title>
			</div>

			<div>
				<ReviewTable reviewPageJSON={reviewPageJSON} />
			</div>
		</div>
	);
};

export default ReviewPage;
