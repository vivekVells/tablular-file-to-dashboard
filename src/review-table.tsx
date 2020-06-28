import React, { FC } from 'react';
import Title from 'antd/lib/typography/Title';
import { Table, Tag, Space } from 'antd';
import { ReviewJSONDataProp } from './dashboard-workflow';
import { ReviewJSONDataGroupingItemProp } from './draft-initial-page';

interface ReviewTableProp {
	reviewPageJSON: ReviewJSONDataProp;
}

const ReviewTable: FC<ReviewTableProp> = ({ reviewPageJSON }) => {
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
	];

	const mockColumns = [
		{
			title: 'First Name',
			dataIndex: 'First Name',
			key: 'first_name',
		},
		{
			title: 'Last Name',
			dataIndex: 'Last Name',
			key: 'last_name',
		},
	];

	const mockReviewPageColumns = () => {
		return Object.keys(
			reviewPageJSON.groupings[0].groupingItems[0].items[0]
		).map((item) => {
			return {
				title: item,
				dataIndex: item,
				key: item.toLowerCase().split(' ').join('_'),
			};
		});
	};

	const mockData = [
		{
			'First Name': 'John',
			'Last Name': 'Doe',
		},
		{
			'First Name': 'Vivek',
			'Last Name': 'Vellai',
		},
	];

	const data = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			tags: ['nice', 'developer'],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			tags: ['loser'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
	];

	return (
		<>
			{/* {JSON.stringify(mockReviewPageColumns())} */}
			<div>
				{/* <Table columns={mockColumns} dataSource={mockData} /> */}
				<Table
					columns={mockReviewPageColumns()}
					dataSource={reviewPageJSON.groupings[0].groupingItems[0].items}
				/>
			</div>
		</>
	);
};

export default ReviewTable;
