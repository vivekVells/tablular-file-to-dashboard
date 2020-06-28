import React, { FC, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import styles from './draft-initial-page.module.scss';
import { Select, Card, Button } from 'antd';

/*
editable title - have to maintain state
subtitle - single drop down - options from jsonData prop
contents - multiselect dropdown - options from jsonData prop
*/

interface ReviewJSONDataGroupingItemProp {
	itemTitle: any;
	items: any;
	show: boolean;
}
interface ReviewJSONDataGroupingsProp {
	groupingBy: string;
	groupingItems: ReviewJSONDataGroupingItemProp[];
}

interface DraftJSONDataGroupingProp {
	groupingIdentifiers: Array<string>;
	groupingItems: Array<string>;
}

interface DraftJSONDataProp extends DraftJSONDataGroupingProp {
	pageTitle: string;
}

interface DraftInitialPageProps {
	// todo: change this arg type
	jsonData: Array<Object>;
	reviewJsonDataCallBkFn: Function;
}

const DraftInitialPage: FC<DraftInitialPageProps> = ({
	jsonData,
	reviewJsonDataCallBkFn,
}) => {
	const setInitialFinalJSONData = (): DraftJSONDataProp => {
		return {
			pageTitle: Object.keys(jsonData[0])[0],
			groupingIdentifiers: [],
			groupingItems: [],
		};
	};

	const [draftJSONData, setDraftJSONData] = useState<DraftJSONDataProp>(
		setInitialFinalJSONData()
	);

	const titleOnChange = (newTitle: string) => {
		setDraftJSONData({ ...draftJSONData, pageTitle: newTitle });
	};

	const PageTitleElement = (
		<div className={styles.pageTitle}>
			<Title>
				<Paragraph editable={{ onChange: titleOnChange }}>
					{draftJSONData.pageTitle}
				</Paragraph>
			</Title>
		</div>
	);

	const groupingIdentifiersOnChange = (values: Array<string>) => {
		setDraftJSONData({ ...draftJSONData, groupingIdentifiers: values });
	};

	const groupingIdentifiersSelectOptions = () => {
		const jsonDataKeys = Object.keys(jsonData[0]);

		return jsonDataKeys.map((key) => {
			return {
				key: key,
				label: key,
				value: key,
			};
		});
	};

	const GroupingIdentifiersElement = (
		<div>
			Group By
			<Select
				id='page-grouping-identifiers-select'
				placeholder='select grouping identifiers'
				size='large'
				mode='multiple'
				showSearch
				style={{ width: 200, paddingLeft: 8, marginBottom: 16 }}
				onChange={groupingIdentifiersOnChange}
				options={groupingIdentifiersSelectOptions()}
				filterOption={true}
			/>
		</div>
	);

	const groupingItemsOnChange = (values: Array<string>) => {
		setDraftJSONData({ ...draftJSONData, groupingItems: values });
	};

	const groupingItemsSelectOptions = () => {
		const jsonDataKeys = Object.keys(jsonData[0]);

		return jsonDataKeys.map((key) => {
			return {
				key: key,
				label: key,
				value: key,
			};
		});
	};

	const GroupingItemsElement = (
		<div>
			After Grouping, visible items
			<Select
				id='page-grouping-items-select'
				placeholder='select page grouping items'
				size='large'
				mode='multiple'
				showSearch
				style={{ width: 200, paddingLeft: 8, marginBottom: 16 }}
				onChange={groupingItemsOnChange}
				options={groupingItemsSelectOptions()}
				filterOption={true}
			/>
		</div>
	);

	function groupBy(list: any[], keyGetter: (arg0: any) => any) {
		const map = new Map();
		list.forEach((item) => {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});
		return map;
	}

	const ReviewOnClick = () => {
		let groupingsArr: ReviewJSONDataGroupingsProp[] = [];

		const generateGroupingsArr = () => {
			draftJSONData.groupingIdentifiers.forEach((groupingIdentifier) => {
				let currentGroupingItemsArr: ReviewJSONDataGroupingItemProp[] = [];

				let grouped = groupBy(jsonData, (data) => data[groupingIdentifier]);

				grouped.forEach((value: any, key: any) => {
					currentGroupingItemsArr.push({
						itemTitle: key,
						items: value,
						show: true,
					});
				});

				groupingsArr.push({
					groupingBy: groupingIdentifier,
					groupingItems: currentGroupingItemsArr,
				});

				currentGroupingItemsArr = [];
			});

			return groupingsArr;
		};

		const ReviewJSONData = {
			pageTitle: draftJSONData.pageTitle,
			groupings: generateGroupingsArr(),
		};

		reviewJsonDataCallBkFn(ReviewJSONData);
	};

	const ReviewElement = (
		<div style={{ textAlign: 'center' }}>
			<Button type='primary' shape='round' onClick={ReviewOnClick}>
				Next Page
			</Button>
		</div>
	);

	return (
		// todo: not sure why we cannot use draft-initial-page
		<div className={styles.draftInitialPage}>
			{PageTitleElement}

			<Card
				headStyle={{ textAlign: 'center' }}
				title='Group By Identifiers & its Items'
				bordered={true}
			>
				{GroupingIdentifiersElement}

				{GroupingItemsElement}

				{ReviewElement}
			</Card>
		</div>
	);
};

export default DraftInitialPage;
