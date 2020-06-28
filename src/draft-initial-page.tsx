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

interface NextPageFinalJSONDataGroupingItemProp {
	itemTitle: any;
	items: any;
	show: boolean;
}
interface NextPageFinalJSONDataGroupingsProp {
	groupingBy: string;
	groupingItems: NextPageFinalJSONDataGroupingItemProp[];
}

interface FinalJSONDataGroupingProp {
	grouping_identifiers: Array<string>;
	grouping_items: Array<string>;
}

interface FinalJSONDataProp extends FinalJSONDataGroupingProp {
	pageTitle: string;
}

interface DraftInitialPageProps {
	// todo: change this arg type
	jsonData: Array<Object>;
	finalJsonDataCallBkFn: Function;
}

const DraftInitialPage: FC<DraftInitialPageProps> = ({
	jsonData,
	finalJsonDataCallBkFn,
}) => {
	const setInitialFinalJSONData = (): FinalJSONDataProp => {
		return {
			pageTitle: Object.keys(jsonData[0])[0],
			grouping_identifiers: [],
			grouping_items: [],
		};
	};

	const [finalJSONData, setFinalJSONData] = useState<FinalJSONDataProp>(
		setInitialFinalJSONData()
	);

	const titleOnChange = (newTitle: string) => {
		setFinalJSONData({ ...finalJSONData, pageTitle: newTitle });
	};

	const PageTitleElement = (
		<div className={styles.pageTitle}>
			<Title>
				<Paragraph editable={{ onChange: titleOnChange }}>
					{finalJSONData.pageTitle}
				</Paragraph>
			</Title>
		</div>
	);

	const groupingIdentifiersOnChange = (values: Array<string>) => {
		setFinalJSONData({ ...finalJSONData, grouping_identifiers: values });
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
		setFinalJSONData({ ...finalJSONData, grouping_items: values });
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

	const nextPageOnClick = () => {
		let groupingsArr: NextPageFinalJSONDataGroupingsProp[] = [];

		const generateGroupingsArr = () => {
			finalJSONData.grouping_identifiers.forEach((groupingIdentifier) => {
				let currentGroupingItemsArr: NextPageFinalJSONDataGroupingItemProp[] = [];

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

		const nextPageFinalJSONData = {
			pageTitle: finalJSONData.pageTitle,
			groupings: generateGroupingsArr(),
		};

		finalJsonDataCallBkFn(nextPageFinalJSONData);
	};

	const NextPageElement = (
		<div style={{ textAlign: 'center' }}>
			<Button type='primary' shape='round' onClick={nextPageOnClick}>
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

				{NextPageElement}
			</Card>
		</div>
	);
};

export default DraftInitialPage;
